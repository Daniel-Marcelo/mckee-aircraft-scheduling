import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { AircraftTimelineCalculatorService } from '../aircraft-timeline/aircraft-timeline-calculator.service';
import { AircraftUtilisationService } from '../aircraft-utilisation/aircraft-utilisation.service';
import { Flight, sortFlights } from '../flight-service/flight.model';
import { RotationValidatorService } from '../rotation-validator/rotation-validator.service';

@Injectable({
  providedIn: 'root'
})
export class FlightsDragDropProcessorService {

  constructor(
    private timelineCalculator: AircraftTimelineCalculatorService, 
    private rotationValidatorService: RotationValidatorService, 
    private aircraftUtilisationService: AircraftUtilisationService) { }

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
