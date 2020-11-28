import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftSchedulingComponent } from './aircraft-scheduling.component';

describe('AircraftSchedulingComponent', () => {
  let component: AircraftSchedulingComponent;
  let fixture: ComponentFixture<AircraftSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AircraftSchedulingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
