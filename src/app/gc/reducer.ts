import { ActionReducer, Action } from '@ngrx/store';
import { GcEventNextAction,
         GcEventPauseListening,
         GcEventStartListening,
         GcEventListenerFailed,
         GcEventType } from './actions';
import { GcEventsUiState, initialState } from './state';

export function gcEventsReducer(state: GcEventsUiState = initialState, action: Action): GcEventsUiState {
  if (GcEventNextAction.matches(action)) {
    return Object.assign({}, state, {
      events: state.events.concat(action.payload)
    });
  }
  if (GcEventStartListening.matches(action)) {
    return Object.assign({}, state, {
      paused: false
    });
  }
  if (GcEventPauseListening.matches(action)) {
    return Object.assign({}, state, {
      paused: true
    });
  }
  if (GcEventListenerFailed.matches(action)) {
    return Object.assign({}, state, {
      paused: true,
      retries: state.retries + 1,
      lastError: action.payload
    });
  }

  return state;
}
