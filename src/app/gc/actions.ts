import { Action } from '@ngrx/store';
import { GcEvent } from './model';

export const GC_EVENT_START_LISTENING = '[GC Event] Run listening';
export const GC_EVENT_PAUSE_LISTENING = '[GC Event] Pause listening';
export const GC_EVENT_LISTENING_FAILURE = '[GC Event] Listener failed';
export const GC_EVENT_NEXT_ACTION = '[GC Event] Next event';

export type GcEventType = GcEvent;

export class GcEventStartListening implements Action {
  readonly type = GC_EVENT_START_LISTENING;

  static matches(action: Action): action is GcEventStartListening {
    return action.type === GC_EVENT_START_LISTENING;
  }

  static create() { return new GcEventStartListening(); }
}

export class GcEventPauseListening implements Action {
  readonly type = GC_EVENT_PAUSE_LISTENING;

  static matches(action: Action): action is GcEventPauseListening {
    return action.type === GC_EVENT_PAUSE_LISTENING;
  }

  static create() { return new GcEventPauseListening(); }
}

export class GcEventNextAction implements Action {
  readonly type = GC_EVENT_NEXT_ACTION;
  private constructor(readonly payload: GcEventType[]) {}

  static matches(action: Action): action is GcEventNextAction {
    return action.type === GC_EVENT_NEXT_ACTION;
  }

  static create(payload: GcEventType[]) { return new GcEventNextAction(payload); }
}

export class GcEventListenerFailed implements Action {
  readonly type = GC_EVENT_LISTENING_FAILURE;
  private constructor(readonly payload: any) {}

  static matches(action: Action): action is GcEventListenerFailed {
    return action.type === GC_EVENT_LISTENING_FAILURE;
  }

  static create(payload: any) { return new GcEventListenerFailed(payload); }
}
