import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AircraftSchedulingComponent } from './aircraft-scheduling.component';
import { AircraftSummaryModule } from '../aircraft-summary/aircraft-summary.module';
import { FlightSummaryModule } from '../flight-summary/flight-summary.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [AircraftSchedulingComponent],
  imports: [
    CommonModule,
    AircraftSummaryModule,
    FlightSummaryModule,
    DragDropModule,
    MatPaginatorModule
  ],
  exports: [AircraftSchedulingComponent]
})
export class AircraftSchedulingModule { }
