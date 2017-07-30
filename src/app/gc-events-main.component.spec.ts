import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcEventsMainComponent } from './gc-events-main.component';

describe('GcEventsMainComponent', () => {
  let component: GcEventsMainComponent;
  let fixture: ComponentFixture<GcEventsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcEventsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcEventsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
