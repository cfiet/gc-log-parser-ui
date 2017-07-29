import { ActionReducer, Action } from '@ngrx/store';
import { GcEventNextAction, GcEventType } from './actions';

export function gcEventsReducer(state: GcEventType[] = [], action: Action): GcEventType {
  if (GcEventNextAction.matches(action)) {
    return state.concat(action.payload);
  }
  return state;
}
