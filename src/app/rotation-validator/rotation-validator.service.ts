import { Injectable } from '@angular/core';
import { Flight } from '../flight-service/flight.model';
import { twentyFourHoursSeconds, twentyMinsSeconds } from '../time.constants';

@Injectable({
  providedIn: 'root'
})
export class RotationValidatorService {

  constructor() { }

  validateRotation(flights: Flight[]) {
    this.validateTurnaroundTime(flights);
    this.validateNoTeleportation(flights);
    this.validateGroundedAtMidnight(flights);
  }

  // Flights list has been pre-sorted
  private validateGroundedAtMidnight(flights: Flight[]): boolean {
    const lastFlight = flights[flights.length - 1];
    return lastFlight.arrivaltime > twentyFourHoursSeconds;
  }

  private validateNoTeleportation(flights: Flight[]): boolean {
    return flights.some(
      (flight, index) => {
        if (!(index === flights.length - 1)) {
          const nextFlight = flights[index + 1];
          return nextFlight.origin !== flight.destination;
        }
        return false;
      })
  }

  private validateTurnaroundTime(flights: Flight[]): boolean {
    let valid = true;
    flights.forEach(
      (flight, index) => {
        if (!(index === flights.length - 1)) {
          const nextFlight = flights[index + 1];
          const turnaroundTime = nextFlight.departuretime - flight.arrivaltime;
          valid = turnaroundTime >= twentyMinsSeconds;
        }
      })
    return valid;
  }
}
