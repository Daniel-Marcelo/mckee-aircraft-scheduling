import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Flight, sortFlights } from '../flights-state/flight.model';

// Maintains the state of the flight rotation
@Injectable({
  providedIn: 'root'
})
export class FlightRotationStateService {

  public readonly flights$: Observable<Flight[]>;
  private flights = new BehaviorSubject<Flight[]>([]);

  constructor() {
    this.flights$ = this.flights.asObservable().pipe(
      tap(flights => sortFlights(flights))
    );
   }
}
