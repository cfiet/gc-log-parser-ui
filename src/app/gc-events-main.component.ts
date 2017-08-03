import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Action } from '@ngrx/store';
import { GcEventsUiState } from './gc/state';

@Component({
  selector: 'app-gc-events-main',
  template: `
    <div class="toolbar" *ngIf="state">
      <md-toolbar color="primary">
        <span>GC logs</span>

        <!-- This fills the remaining space of the current row -->
        <span class="example-fill-remaining-space"></span>

        <span>
          {{state.paused ? 'Paused' : 'Running'}},&nbsp;
        </span>
        <span *ngIf="!state.events">
          no events captured yet
        </span>
        <span *ngIf="state.events.length">
          captured {{state.events.length}} events
        </span>
      </md-toolbar>
    </div>

    <div class="content" *ngIf="state && state.events && state.events.length">
      <app-gc-events-chart [events]="state.events"></app-gc-events-chart>
    </div>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }

    :host .example-fill-remaining-space {
      flex: 1 1 auto;
    }

    :host .toolbar {
      position: absolute;
      left: 0;
      right: 0;
      min-height: 64px;
      width: 100%;
    }

    :host > .content {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding-top: 64px;
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
