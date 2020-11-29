import { TestBed } from '@angular/core/testing';

import { RotationValidatorService } from './rotation-validator.service';

describe('RotationValidatorService', () => {
  let service: RotationValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RotationValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
