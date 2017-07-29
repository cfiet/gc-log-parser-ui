import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './state';
import { GcEventStartListening } from './gc/actions';

@Component({
  selector: 'app-root',
  template: `
    <h1>
      Welcome to {{title}}!!
    </h1>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  constructor(private _store: Store<AppState>) {
    _store.dispatch(new GcEventStartListening());

    _store.select(i => i.events).forEach(console.log);
  }
}
