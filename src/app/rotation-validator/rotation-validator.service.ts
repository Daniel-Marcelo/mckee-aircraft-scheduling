import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Flight } from '../flight-service/flight.model';
import { twentyFourHoursSeconds, twentyMinsSeconds } from '../time.constants';

@Injectable({
  providedIn: 'root'
})
export class RotationValidatorService {

  constructor(private messageService: MessageService) { }

  validateRotation(flights: Flight[]): boolean {
    let flightPathValid = false;
    let turnaroundTimeValid = false;
    const groundedAtMidnightValid = this.validateGroundedAtMidnight(flights);

    flights.slice(0, flights.length - 1).some(
      (flight, index) => {
        const nextFlight = flights[index + 1];
        flightPathValid = this.validateFlightPath(flight, nextFlight)
        turnaroundTimeValid = this.validateTurnaroundTime(flight, nextFlight);
      })
    return flightPathValid && turnaroundTimeValid && groundedAtMidnightValid;
  }

  // Flights list has been pre-sorted
  private validateGroundedAtMidnight(flights: Flight[]): boolean {
    const lastFlight = flights[flights.length - 1];
    const invalid = lastFlight.arrivaltime > twentyFourHoursSeconds;
    return this.generateViolation(invalid, 'Flight must be grounded at midnight');
  }

  private validateFlightPath(flight: Flight, nextFlight: Flight): boolean {
    const invalid = nextFlight.origin !== flight.destination;
      return this.generateViolation(invalid, 'Invalid origin/destination for subsequent flights')
  }

  private validateTurnaroundTime(flight: Flight, nextFlight: Flight): boolean {
    const turnaroundTime = nextFlight.departuretime - flight.arrivaltime;
    const invalid = turnaroundTime < twentyMinsSeconds;
    return this.generateViolation(invalid, 'Min. turnaround of 20 minutes. Please review rotation')
  }

  private generateViolation(invalid: boolean, message: string): boolean {
    if (invalid) {
      this.messageService.add({ severity: 'error', summary: 'Violation', detail: `${message}. Please review rotation`, sticky: true });
    }
    return invalid;
  }
}
