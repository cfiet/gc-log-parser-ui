import { Action } from '@ngrx/store';

export const GC_EVENT_START_LISTENING = '[GC Event] Listen';
export const GC_EVENT_NEXT_ACTION = '[GC Event] Next event';

export type GcEventType = any;

export class GcEventStartListening implements Action {
  readonly type = GC_EVENT_START_LISTENING;

  static matches(action: Action): action is GcEventStartListening {
    return action.type === GC_EVENT_START_LISTENING;
  }
}

export class GcEventNextAction implements Action {
  readonly type = GC_EVENT_NEXT_ACTION;
  private constructor(readonly payload: GcEventType[]) {}

  static matches(action: Action): action is GcEventNextAction {
    return action.type === GC_EVENT_NEXT_ACTION;
  }

  static create(payload: GcEventType[]) {
    return new GcEventNextAction(payload);
  }
}


