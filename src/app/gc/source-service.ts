import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BrowserWindow } from '../tokens';
import { GcEventType } from './actions';

@Injectable()
export class SourceService {
  constructor(@Inject(BrowserWindow) private window: any) { }

  listen(): Observable<GcEventType> {
    const { EventSource } = this.window;
    return new Observable<GcEventType>((sub) => {
      let gotConnection = false;
      const source = new EventSource('http://localhost:9090/stream/gc');
      source.addEventListener('gc-event', (ev) => {
        const eventData = JSON.parse(ev.data);
        sub.next(eventData);
      });
      source.addEventListener('error', (ev) => {
        switch (source.readyState) {
          case EventSource.CLOSED:
            if (gotConnection) {
              sub.error('Connection has been terminated');
            } else {
              sub.error('Unable to connect to event source');
            }
            break;

          default:
            sub.error('Unrecognized error');
            break;
        }
      });
      source.addEventListener('open', (ev) => {
        gotConnection = true;
      });
      return () => {
        if (source.readyState !== EventSource.CLOSED) {
          source.close();
        }
      };
    });
  }
}
