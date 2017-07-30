import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

import { SourceService } from './source-service';
import { GC_EVENT_START_LISTENING,
         GC_EVENT_LISTENING_FAILURE,
         GcEventNextAction,
         GcEventListenerFailed,
         GcEventStartListening } from './actions';

@Injectable()
export class GcEventsEffects {
  constructor(private source: SourceService, private actions$: Actions) { }

  @Effect()
  loadGcEvents$ = this.actions$.ofType(GC_EVENT_START_LISTENING).mergeMap(() =>
    this.source.listen()
  )
  .map(GcEventNextAction.create)
  .catch((err, original) =>
    Observable.of(GcEventListenerFailed.create(err))
  );
}
