import { TestBed } from '@angular/core/testing';

import { FlightRotationService } from './flight-rotation.service';

describe('FlightRotationService', () => {
  let service: FlightRotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightRotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
