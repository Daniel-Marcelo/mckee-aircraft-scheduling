import { TestBed } from '@angular/core/testing';

import { FlightsDragDropProcessorService } from './flights-drag-drop-processor.service';

describe('FlightsDragDropProcessorService', () => {
  let service: FlightsDragDropProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightsDragDropProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
