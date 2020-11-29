import { TestBed } from '@angular/core/testing';

import { AircraftUtilisationService } from './aircraft-utilisation.service';

describe('AircraftUtilisationService', () => {
  let service: AircraftUtilisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AircraftUtilisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
