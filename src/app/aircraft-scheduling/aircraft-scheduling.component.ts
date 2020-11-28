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

  fs: Flight[] = [{
    id: 'AS1234',
    departuretime: 27000,
    arrivaltime: 33300,
    readable_departure: '07:30',
    readable_arrival: '09:15', origin: 'LHBP', destination: 'LFSB'
  },
  {
    id: 'AS1234',
    departuretime: 27000,
    arrivaltime: 33300,
    readable_departure: '07:30',
    readable_arrival: '09:15', origin: 'LHBP', destination: 'LFSB'
  }];
  public flights$: Observable<Flight[]>
  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightService.getFlights().pipe().subscribe();
    this.flights$ = this.flightService.flights$;
  }
}
