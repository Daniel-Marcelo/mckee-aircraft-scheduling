import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSummaryComponent } from './flight-summary.component';
import { MatCardModule } from '@angular/material/card';
import { FlightsListComponent } from '../flights-list/flights-list.component';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [FlightSummaryComponent, FlightsListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    HttpClientModule,
    DragDropModule
  ],
  exports: [FlightSummaryComponent, FlightsListComponent],
})
export class FlightSummaryModule { }
