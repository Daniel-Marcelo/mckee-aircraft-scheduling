import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../flight-service/flight.model';
import { FlightService } from '../flight-service/flight.service';

@Component({
  selector: 'mckee-aircraft-scheduling',
  templateUrl: './aircraft-scheduling.component.html',
  styleUrls: ['./aircraft-scheduling.component.scss']
})
export class AircraftSchedulingComponent implements OnInit {

  public flights$: Observable<Flight[]>
  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightService.getFlights().pipe().subscribe();
    this.flights$ = this.flightService.flights$;
  }
}
