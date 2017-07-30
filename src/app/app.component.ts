import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store, Action } from '@ngrx/store';
import { AppState } from './state';

import { GcEventsUiState } from './gc/state';
import { GcEventStartListening } from './gc/actions';


@Component({
  selector: 'app-root',
  template: `
    <app-gc-events-main [state]="gcState$ | async" (actions)="dispatchAction($event)">
    </app-gc-events-main>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }
  `]
})
export class AppComponent {
  private gcState$: Observable<GcEventsUiState>;

  constructor(private _store: Store<AppState>) {
    this.gcState$ = _store.select(i => i.gc);

    _store.dispatch(new GcEventStartListening());
  }

  dispatchAction(action: Action) {
    this._store.dispatch(action);
  }
}
