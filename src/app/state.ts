import { GcEventType } from './gc/actions';

export interface AppState {
  events: GcEventType[];
}
