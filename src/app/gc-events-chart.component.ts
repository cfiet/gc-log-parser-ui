import { Component,
         Input,
         Output,
         OnChanges,
         EventEmitter,
         SimpleChanges,
         ElementRef,
         ChangeDetectionStrategy } from '@angular/core';
import { GcEventType } from './gc/actions';

@Component({
  selector: 'app-gc-events-chart',
  template: `
    <chart [options]="options" (load)="persistChart($event.context)"></chart>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    :host chart {
      display: block;
      width: 100%;
      height: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GcEventsChartComponent implements OnChanges {
  @Input()
  events: GcEventType[];

  chart: any;

  options = {
    animation: {
      duration: 1000
    },
    margin: 0,
    title: 'GC Events',
    series: [
      { name: 'Heap size', data: [] },
      { name: 'Generation size - eden', data: [] },
      { name: 'Generation size - old', data: [] },
      { name: 'Generation size - survivor', data: [] },
      { name: 'Generation size - humongous', data: [] },
    ],
  };

  constructor(private element: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.events || !this.events.length || !this.chart) {
      return;
    }

    window.requestAnimationFrame(() => {
      for (let i = this.chart.series[0].data.length; i < this.events.length; i++) {
        const x = this.events[i].timeOffset.millis;
        const heapSizeValue = this.events[i].heapSize.size;
        const edenGenValue = this.events[i].generationSizes.eden;
        const oldGenValue = this.events[i].generationSizes.old;
        const survivorGenValue = this.events[i].generationSizes.survivor;
        const humongousGenValue = this.events[i].generationSizes.humongous;

        this.chart.series[0].addPoint([x, heapSizeValue], false, false);
        this.chart.series[1].addPoint([x, edenGenValue], false, false);
        this.chart.series[2].addPoint([x, oldGenValue], false, false);
        this.chart.series[3].addPoint([x, survivorGenValue], false, false);
        this.chart.series[4].addPoint([x, humongousGenValue], false, false);
      }
      this.chart.redraw();
    });
  }

  persistChart(chart: any) {
    this.chart = chart;
  }
}
