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
  private readonly turnaroundTimeError = 'Min. turnaround of 20 minutes.';
  private readonly groundedAtMidnightError = 'Flight must be grounded at midnight.';

  private validationMessageMap = new Map<RotationValidation, string>([])

  constructor(private messageService: MessageService) { }

  validateRotation(flights: Flight[]): void {
    this.messageService.clear();
    this.validationMessageMap.clear();
    // let flightPathValid = false;
    // let turnaroundTimeValid = false;
    const groundedAtMidnightValid = this.validateGroundedAtMidnight(flights);

    flights.slice(0, flights.length - 1).some(
      (flight, index) => {
        const nextFlight = flights[index + 1];
        this.validateFlightPath(flight, nextFlight)
        this.validateTurnaroundTime(flight, nextFlight);
      })
    this.generateViolation();
    // return flightPathValid && turnaroundTimeValid && groundedAtMidnightValid;
  }

  // Flights list has been pre-sorted
  private validateGroundedAtMidnight(flights: Flight[]): void {
    const lastFlight = flights[flights.length - 1];
    const invalid = lastFlight.arrivaltime > twentyFourHoursSeconds;
    this.generateViolationMessage(invalid, this.groundedAtMidnightError , RotationValidation.GroundedAtMidnight);
    // return this.generateViolation(invalid, 'Flight must be grounded at midnight', this.groundedAtMidnightMessageId);
  }

  private validateFlightPath(flight: Flight, nextFlight: Flight): void {
    const invalid = nextFlight.origin !== flight.destination;
    this.generateViolationMessage(invalid, this.flightPathError , RotationValidation.FlightPath);
    // return this.generateViolation(invalid, 'Invalid origin/destination for subsequent flights', this.flightPathMessageId)
  }

  private validateTurnaroundTime(flight: Flight, nextFlight: Flight): void {
    const turnaroundTime = nextFlight.departuretime - flight.arrivaltime;
    const invalid = turnaroundTime < twentyMinsSeconds;
    this.generateViolationMessage(invalid, this.turnaroundTimeError , RotationValidation.TurnaroundTime);
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
