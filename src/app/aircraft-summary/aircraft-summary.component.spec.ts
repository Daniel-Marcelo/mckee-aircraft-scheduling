import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftSummaryComponent } from './aircraft-summary.component';

describe('AircraftSummaryComponent', () => {
  let component: AircraftSummaryComponent;
  let fixture: ComponentFixture<AircraftSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AircraftSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
