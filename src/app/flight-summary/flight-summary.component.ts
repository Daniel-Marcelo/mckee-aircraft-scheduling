import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Flight } from '../flight-service/flight.model';

@Component({
  selector: 'mckee-flight-summary',
  templateUrl: './flight-summary.component.html',
  styleUrls: ['./flight-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightSummaryComponent implements OnInit {

  @Input()
  public flight: Flight;
  
  constructor() { }

  ngOnInit(): void {
  }

}
