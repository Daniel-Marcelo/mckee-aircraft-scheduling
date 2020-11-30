import { TestBed } from '@angular/core/testing';

import { AircraftUtilisationCalculatorService } from './aircraft-utilisation-calculator.service';

describe('AircraftUtilisationService', () => {
  let service: AircraftUtilisationCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AircraftUtilisationCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
