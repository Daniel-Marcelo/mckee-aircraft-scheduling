import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { AircraftTimelineCalculatorService } from '../aircraft-timeline/aircraft-timeline-calculator.service';
import { AircraftUtilisationCalculatorService } from '../aircraft-utilisation-calculator/aircraft-utilisation-calculator.service';
import { Flight, sortFlights } from '../flights-state/flight.model';
import { RotationValidatorService } from '../rotation-validator/rotation-validator.service';

// Processes when a flight is dragged and dropped into the current flight rotation container
@Injectable({
  providedIn: 'root'
})
export class RotationDragDropProcessorService {

  constructor(
    private timelineCalculator: AircraftTimelineCalculatorService,
    private rotationValidatorService: RotationValidatorService,
    private aircraftUtilisationService: AircraftUtilisationCalculatorService) { }

  rotationFlightDropped(event: CdkDragDrop<Flight[]>): void {
    // Make temporary copies of the two arrays, update them accordingly and validate
    if (event.previousContainer !== event.container) {
      const tempRotationFlights = [...event.container.data];
      const tempAvailableFlights = [...event.previousContainer.data];
      transferArrayItem(tempAvailableFlights, tempRotationFlights, event.previousIndex, event.currentIndex);
      sortFlights(tempRotationFlights);
      const invalidFlightRotation = this.rotationValidatorService.validateRotation(tempRotationFlights);

      // If validations are successful, perform permanent update
      if (!invalidFlightRotation) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        sortFlights(event.container.data);
        this.aircraftUtilisationService.calculateAircraftUtilisation().subscribe();
        this.timelineCalculator.calculateTimeline(event.container.data);
      }
    }
  }
}
