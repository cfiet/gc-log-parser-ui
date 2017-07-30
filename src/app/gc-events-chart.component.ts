import { Component,
         Input,
         Output,
         OnChanges,
         EventEmitter,
         SimpleChanges,
         ElementRef,
         AfterViewInit,
         ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';
import { GcEventType } from './gc/actions';


@Component({
  selector: 'app-gc-events-chart',
  template: `
    <svg class="chart" [attr.width]="chartWidth" [attr.height]="chartHeight">
      <g class="x-axis" />
      <g class="y-axis left-axis" />
      <g class="y-axis right-axis" />
      <g class="content">
        <path class="heapsize" />
        <path class="area eden" />
        <path class="area old" />
        <path class="area survivors" />
        <path class="area humongous" />
      </g>
    </svg>
  `,
  styles: [`
    svg.chart {
      width: 100%;
      height: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GcEventsChartComponent implements OnChanges, AfterViewInit {
  @Input()
  events: GcEventType[];

  chartWidth = 0;
  chartHeight = 0;
  svgDom: Element;

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    const domElement = <HTMLElement>this.element.nativeElement;
    this.svgDom = domElement.querySelector('svg.chart');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.events || !this.events.length || !this.element) {
      return;
    }

    const size = this.svgDom.getBoundingClientRect();
    const margins = {
      left: 50,
      right: 50,
      top: 10,
      bottom: 50
    };
    const viewport = {
      left: Math.round(margins.left),
      top: Math.round(margins.top),
      width: Math.round(size.width - margins.left - margins.right),
      height: Math.round(size.height - margins.top - margins.bottom)
    };

    const barGroupWidth = Math.floor(viewport.width / this.events.length);

    this.chartWidth = Math.round(size.width);
    this.chartHeight = Math.round(size.height);
    const tMin = d3.min(this.events.map(e => e.timeOffset.millis));
    const tMax = d3.max(this.events.map(e => e.timeOffset.millis));
    const timeScale = d3.scaleLinear().domain([tMin - barGroupWidth, tMax]).range([0, viewport.width]);
    const timeAxis = d3.axisBottom(timeScale).ticks(20);

    const hsTotal = d3.max(this.events.map(e => e.heapSize.total));
    const heapSizeScale = d3.scaleLinear().domain([0, hsTotal]).range([viewport.height, 0]);
    const heapSizeAxis = d3.axisRight(heapSizeScale).ticks(5);

    const generationsTotal = d3.max(this.events.map(e => e.generationSizes).map(gs =>
      d3.sum([gs.eden, gs.humongous, gs.old, gs.survivor])
    ));
    const generationsScale = d3.scaleLinear().domain([0, generationsTotal]).range([viewport.height, 0]);
    const generationsAxis = d3.axisLeft(generationsScale).ticks(5);

    d3.select(this.svgDom).select('g.x-axis')
      .attr('transform', `translate(${viewport.left}, ${viewport.top + viewport.height})`)
      .attr('font-family', 'Roboto, sans-serif')
      .attr('font-size', '10pt')
      .call(timeAxis);

    d3.select(this.svgDom).select('g.y-axis.left-axis')
      .attr('transform', `translate(${viewport.left}, ${viewport.top})`)
      .attr('font-family', 'Roboto, sans-serif')
      .attr('font-size', '10pt')
      .call(generationsAxis);

    d3.select(this.svgDom).select('g.y-axis.right-axis')
      .attr('transform', `translate(${viewport.left + viewport.width}, ${viewport.top})`)
      .attr('font-family', 'Roboto, sans-serif')
      .attr('font-size', '10pt')
      .call(heapSizeAxis);

    const heapSizeLine = d3.line<GcEventType>()
      .x(e =>
        timeScale(e.timeOffset.millis)
      )
      .y(e =>
        heapSizeScale(e.heapSize.size)
      );

    d3.select(this.svgDom).select('g.content')
      .attr('transform', `translate(${viewport.left}, ${viewport.top})`)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', '2px')
      .select('path.heapsize')
      .datum(this.events)
      .attr('d', d => heapSizeLine(d));

    d3.select(this.svgDom).select('g.content')
      .selectAll('g.bar.generationSizes')
      .data(this.events)
      .exit().remove();

    const oldArea = d3.area<GcEventType>()
      .x(e => timeScale(e.timeOffset.millis))
      .y0(generationsScale(0))
      .y1(e => generationsScale(e.generationSizes.old));
    d3.select(this.svgDom).select('g.content')
      .select('path.area.old')
      .attr('stroke', 'none')
      .attr('fill', 'red')
      .attr('fill-opacity', '0.6')
      .attr('d', oldArea(this.events));

    console.log(this.events.map(e => e.generationSizes.survivor));

    const surviviorsArea = d3.area<GcEventType>()
      .x(e => timeScale(e.timeOffset.millis))
      .y0(e => generationsScale(e.generationSizes.old))
      .y1(e => generationsScale(e.generationSizes.old + e.generationSizes.survivor));
    d3.select(this.svgDom).select('g.content')
      .select('path.area.survivors')
      .attr('stroke', 'none')
      .attr('fill', 'blue')
      .attr('fill-opacity', '0.3')
      .attr('d', surviviorsArea(this.events));

    const edenArea = d3.area<GcEventType>()
      .x(e => timeScale(e.timeOffset.millis))
      .y0(e => generationsScale(e.generationSizes.old + e.generationSizes.survivor))
      .y1(e => generationsScale(e.generationSizes.old + e.generationSizes.survivor + e.generationSizes.eden));
    d3.select(this.svgDom).select('g.content')
      .select('path.area.eden')
      .attr('stroke', 'none')
      .attr('fill', 'green')
      .attr('fill-opacity', '0.6')
      .attr('d', edenArea(this.events));

    const humongousArea = d3.area<GcEventType>()
      .x(e => timeScale(e.timeOffset.millis))
      .y0(e => generationsScale(e.generationSizes.old + e.generationSizes.survivor + e.generationSizes.eden))
      .y1(e => generationsScale(e.generationSizes.old + e.generationSizes.survivor + e.generationSizes.eden + e.generationSizes.humongous));
  }
}
