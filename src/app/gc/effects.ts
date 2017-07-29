import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { SourceService } from './source-service';
import { GC_EVENT_START_LISTENING, GcEventNextAction } from './actions';

@Injectable()
export class GcEventsEffects {
  constructor(private source: SourceService, private actions$: Actions) {}

  @Effect()
  loadGcEvents$ = this.actions$.ofType(GC_EVENT_START_LISTENING).mergeMap(() =>
    this.source.listen()
  ).map(GcEventNextAction.create);
}
