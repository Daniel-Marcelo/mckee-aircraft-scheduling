import { TestBed } from '@angular/core/testing';

import { AircraftTimelineCalculatorService } from './aircraft-timeline-calculator.service';

describe('AircraftTimelineCalculatorService', () => {
  let service: AircraftTimelineCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AircraftTimelineCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
