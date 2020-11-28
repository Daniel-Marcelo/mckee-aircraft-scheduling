import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AircraftSchedulingComponent } from './aircraft-scheduling.component';
import { AircraftSummaryModule } from '../aircraft-summary/aircraft-summary.module';
import { FlightSummaryModule } from '../flight-summary/flight-summary.module';

@NgModule({
  declarations: [AircraftSchedulingComponent],
  imports: [
    CommonModule,
    AircraftSummaryModule,
    FlightSummaryModule
  ],
  exports: [AircraftSchedulingComponent]
})
export class AircraftSchedulingModule { }
