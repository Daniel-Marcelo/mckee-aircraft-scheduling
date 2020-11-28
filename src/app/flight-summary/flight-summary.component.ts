import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../flight-service/flight.model';

@Component({
  selector: 'mckee-flight-summary',
  templateUrl: './flight-summary.component.html',
  styleUrls: ['./flight-summary.component.scss']
})
export class FlightSummaryComponent implements OnInit {

  @Input()
  public flight: Flight;
  
  constructor() { }

  ngOnInit(): void {
  }

}
