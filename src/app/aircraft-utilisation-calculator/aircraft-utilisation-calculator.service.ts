import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { FlightRotationStateService } from '../flight-rotation-state/flight-rotation-state.service';
import { Flight } from '../flights-state/flight.model';
import { twentyFourHoursSeconds } from '../constants/time.constants';

// Calculates the % utilisation for the aircraft
@Injectable({
  providedIn: 'root'
})
export class AircraftUtilisationCalculatorService {

  public readonly aircraftUtilisation$: Observable<number>;
  private aircraftUtilisation = new BehaviorSubject(0);

  constructor(private flightRotationService: FlightRotationStateService) {
    this.aircraftUtilisation$ = this.aircraftUtilisation.asObservable();
   }

  calculateAircraftUtilisation(): Observable<Flight[]> {
   return this.flightRotationService.flights$.pipe(
      take(1),
      tap(flights => this.calculateUtilisation(flights))
    );
  }

  private calculateUtilisation(flights: Flight[]): void {
    const totalFlightTime = flights.reduce((accumulator, currentFlight) =>
      accumulator + (currentFlight.arrivaltime - currentFlight.departuretime), 0
    );
    this.aircraftUtilisation.next(totalFlightTime/twentyFourHoursSeconds);
  }
}
