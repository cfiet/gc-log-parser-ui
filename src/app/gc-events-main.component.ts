import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Action } from '@ngrx/store';
import { GcEventsUiState } from './gc/state';

@Component({
  selector: 'app-gc-events-main',
  template: `
    <md-toolbar color="primary">
      <span>GC logs</span>

      <!-- This fills the remaining space of the current row -->
      <span class="example-fill-remaining-space"></span>

      <span>
        {{state.paused ? 'Paused' : 'Running'}},&nbsp;
      </span>
      <span *ngIf="!state.events.length">
        no events captured yet
      </span>
      <span *ngIf="state.events.length">
        captured {{state.events.length}} events
      </span>
    </md-toolbar>
  `,
  styles: [`
    .example-fill-remaining-space {
      flex: 1 1 auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GcEventsMainComponent {
  @Input()
  public state: GcEventsUiState;

  @Output()
  public actions = new EventEmitter<Action>();
}
