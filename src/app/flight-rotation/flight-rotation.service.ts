import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Flight, sortFlights } from '../flight-service/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightRotationService {

  public readonly flights$: Observable<Flight[]>;
  private flights = new BehaviorSubject<Flight[]>([]);

  constructor() {
    this.flights$ = this.flights.asObservable().pipe(
      tap(flights => sortFlights(flights))
    );
   }
}
