import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { FlightRotationService } from '../flight-rotation/flight-rotation.service';
import { Flight } from '../flight-service/flight.model';
import { twentyFourHoursSeconds } from '../constants/time.constants';

@Injectable({
  providedIn: 'root'
})
export class AircraftUtilisationService {

  public readonly aircraftUtilisation$: Observable<number>;
  private aircraftUtilisation = new BehaviorSubject(0);

  constructor(private flightRotationService: FlightRotationService) {
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
