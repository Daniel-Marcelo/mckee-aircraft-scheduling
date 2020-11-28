import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../flight-service/flight.model';
import { FlightService } from '../flight-service/flight.service';

@Component({
  selector: 'mckee-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.scss']
})
export class FlightsListComponent implements OnInit {

  public flights$: Observable<Flight[]>
  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightService.getFlights().pipe().subscribe();
    this.flights$ = this.flightService.flights$;
  }
}