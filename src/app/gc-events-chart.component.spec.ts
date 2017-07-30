import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcEventsChartComponent } from './gc-events-chart.component';

describe('GcEventsChartComponent', () => {
  let component: GcEventsChartComponent;
  let fixture: ComponentFixture<GcEventsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcEventsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcEventsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
