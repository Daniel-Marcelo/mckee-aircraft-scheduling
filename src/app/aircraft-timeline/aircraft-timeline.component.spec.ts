import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftTimelineComponent } from './aircraft-timeline.component';

describe('AircraftTimelineComponent', () => {
  let component: AircraftTimelineComponent;
  let fixture: ComponentFixture<AircraftTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AircraftTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
