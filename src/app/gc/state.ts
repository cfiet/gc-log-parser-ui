import { GcEventType } from './actions';

export interface GcEventsUiState {
  readonly events: GcEventType[];
  readonly paused: boolean;
  readonly retries: number;
  readonly lastError: any;
}

export const initialState: GcEventsUiState = {
  events: <GcEventType[]>[],
  paused: true,
  retries: 0,
  lastError: undefined
};
