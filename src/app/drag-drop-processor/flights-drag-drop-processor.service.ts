import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { AircraftTimelineCalculatorService } from '../aircraft-timeline/aircraft-timeline-calculator.service';
import { AircraftUtilisationCalculatorService } from '../aircraft-utilisation-calculator/aircraft-utilisation-calculator.service';
import { Flight, sortFlights } from '../flights-state/flight.model';
import { RotationValidatorService } from '../rotation-validator/rotation-validator.service';

// Processes when a flight is dragged and dropped into the available flights container
@Injectable({
  providedIn: 'root'
})
export class FlightsDragDropProcessorService {

  constructor(
    private timelineCalculator: AircraftTimelineCalculatorService, 
    private rotationValidatorService: RotationValidatorService, 
    private aircraftUtilisationService: AircraftUtilisationCalculatorService) { }

  availableFlightDropped(event: CdkDragDrop<Flight[]>): void {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      sortFlights(event.container.data);
      this.aircraftUtilisationService.calculateAircraftUtilisation().subscribe();
      this.rotationValidatorService.validateRotation(event.previousContainer.data);
      this.timelineCalculator.calculateTimeline(event.previousContainer.data);
    }
  }
}
