import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Flight } from '../flight-service/flight.model';
import { twentyFourHoursSeconds, twentyMinsSeconds } from '../time.constants';
import { RotationValidation } from './rotation-validator.model';

@Injectable({
  providedIn: 'root'
})
export class RotationValidatorService {

  private readonly flightPathError = 'Invalid origin/dest. for subsequent flights.';
  private readonly turnaroundTimeError = 'Min. turnaround time of 20 minutes.';
  private readonly groundedAtMidnightError = 'Flight must be grounded at midnight.';

  private validationMessageMap = new Map<RotationValidation, string>([])

  constructor(private messageService: MessageService) { }

  validateRotation(flights: Flight[]): boolean {
    this.messageService.clear();
    this.validationMessageMap.clear();
    let invalid = false;
    if (flights.length > 0) {
      const notGroundedAtMidnight = this.isNotGroundedAtMidnight(flights);

      const flightPathTurnaroundTimeInvalid = flights.slice(0, flights.length - 1).some(
        (flight, index) => {
          const nextFlight = flights[index + 1];
          const flightPathInvalid = this.isFlightPathInvalid(flight, nextFlight)
          const turnAroundTimeInvalid = this.isTurnAroundTimeInvalid(flight, nextFlight);
          return flightPathInvalid || turnAroundTimeInvalid;
        })
      this.generateViolation();
      invalid = notGroundedAtMidnight || flightPathTurnaroundTimeInvalid
    }
    return invalid;
    // return flightPathValid && turnaroundTimeValid && groundedAtMidnightValid;
  }

  // Flights list has been pre-sorted
  private isNotGroundedAtMidnight(flights: Flight[]): boolean {
    const lastFlight = flights[flights.length - 1];
    const invalid = lastFlight.arrivaltime > twentyFourHoursSeconds;
    this.generateViolationMessage(invalid, this.groundedAtMidnightError, RotationValidation.GroundedAtMidnight);
    return invalid;
    // return this.generateViolation(invalid, 'Flight must be grounded at midnight', this.groundedAtMidnightMessageId);
  }

  private isFlightPathInvalid(flight: Flight, nextFlight: Flight): boolean {
    const invalid = nextFlight.origin !== flight.destination;
    this.generateViolationMessage(invalid, this.flightPathError, RotationValidation.FlightPath);
    return invalid;
    // return this.generateViolation(invalid, 'Invalid origin/destination for subsequent flights', this.flightPathMessageId)
  }

  private isTurnAroundTimeInvalid(flight: Flight, nextFlight: Flight): boolean {
    const turnaroundTime = nextFlight.departuretime - flight.arrivaltime;
    const invalid = turnaroundTime < twentyMinsSeconds;
    this.generateViolationMessage(invalid, this.turnaroundTimeError, RotationValidation.TurnaroundTime);
    return invalid;
    // return this.generateViolation(invalid, 'Min. turnaround of 20 minutes. Please review rotation', this.turnaroundTimeMessageId)
  }

  private generateViolationMessage(invalid: boolean, message: string, validation: RotationValidation): void {
    if (invalid) {
      this.validationMessageMap.set(validation, message);
    }
  }

  private generateViolation(): void {
    const message = Array.from(this.validationMessageMap.values()).join('\n');
    if (message) {
      this.messageService.add({ severity: 'error', summary: 'Violation(s) - Please Review Rotation', detail: `${message}`, sticky: true });
    }
  }

  // private generateViolation(invalid: boolean, message: string, messageKey: string): boolean {
  //   if (invalid) {
  //     this.messageService.add({ severity: 'error', summary: 'Violation', detail: `${message}. Please review rotation`, sticky: true });
  //   }
  //   return invalid;
  // }
}
