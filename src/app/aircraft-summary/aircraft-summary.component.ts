import { Component, Input, OnInit } from '@angular/core';
import { Aircraft } from '../aircraft-service/aircraft.model';

@Component({
  selector: 'mckee-aircraft-summary',
  templateUrl: './aircraft-summary.component.html',
  styleUrls: ['./aircraft-summary.component.scss']
})
export class AircraftSummaryComponent implements OnInit {

  @Input()
  public aircraft: Aircraft;
  
  constructor() { }

  ngOnInit(): void {
  }

}
