import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AircraftSummaryComponent } from './aircraft-summary.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AircraftSummaryComponent],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [AircraftSummaryComponent],
})
export class AircraftSummaryModule { }
