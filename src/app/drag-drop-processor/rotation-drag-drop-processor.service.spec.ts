import { TestBed } from '@angular/core/testing';

import { RotationDragDropProcessorService } from './rotation-drag-drop-processor.service';

describe('RotationDragDropProcessorService', () => {
  let service: RotationDragDropProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RotationDragDropProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
