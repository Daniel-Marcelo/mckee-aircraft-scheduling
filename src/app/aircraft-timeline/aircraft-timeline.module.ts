import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AircraftTimelineComponent } from './aircraft-timeline.component';



@NgModule({
  declarations: [AircraftTimelineComponent],
  imports: [
    CommonModule
  ],
  exports: [AircraftTimelineComponent],
})
export class AircraftTimelineModule { }
