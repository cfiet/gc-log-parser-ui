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
      const source = new EventSource('http://localhost:9090/stream/gc');
      source.addEventListener('gc-event', (ev) => {
        const eventData = JSON.parse(ev.data);
        sub.next(eventData);
      });
      source.onerror = (ev =>
        sub.error(ev.data)
      );
      return source.close;
    });
  }
}
