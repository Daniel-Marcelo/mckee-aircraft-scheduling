import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Aircraft } from '../aircraft-service/aircraft.model';
import { AircraftService } from '../aircraft-service/aircraft.service';
import { AircraftUtilisationService } from '../aircraft-utilisation/aircraft-utilisation.service';
import { FlightRotationService } from '../flight-rotation/flight-rotation.service';
import { Flight, sortFlights } from '../flight-service/flight.model';
import { FlightService } from '../flight-service/flight.service';
import { Pagination } from '../flight-service/pagination.model';
import { RotationValidatorService } from '../rotation-validator/rotation-validator.service';
import { twentyFourHoursSeconds } from '../constants/time.constants';
import { generateTimelineSlot, TimelineAction, TimelineSlot } from './timeline.model';
import { AircraftTimelineCalculatorService } from '../aircraft-timeline/aircraft-timeline-calculator.service';

@Component({
  selector: 'mckee-aircraft-scheduling',
  templateUrl: './aircraft-scheduling.component.html',
  styleUrls: ['./aircraft-scheduling.component.scss']
})
export class AircraftSchedulingComponent implements OnInit {

  public readonly flights$: Observable<Flight[]>;
  public readonly aircrafts$: Observable<Aircraft[]>;
  public readonly flightsInRotation$: Observable<Flight[]>;

  constructor(private timelineCalculator: AircraftTimelineCalculatorService, private flightService: FlightService, private rotationValidatorService: RotationValidatorService, private aircraftService: AircraftService, private flightRotationService: FlightRotationService, private aircraftUtilisationService: AircraftUtilisationService) {
    this.flights$ = this.flightService.flights$;
    this.aircrafts$ = this.aircraftService.aircrafts$;
    this.flightsInRotation$ = this.flightRotationService.flights$;
  }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe();
    this.aircraftService.getAircrafts().subscribe();
  }

  availableFlightDropped(event: CdkDragDrop<Flight[]>): void {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      sortFlights(event.container.data);
      this.aircraftUtilisationService.calculateAircraftUtilisation().subscribe();
      this.rotationValidatorService.validateRotation(event.previousContainer.data);
      this.timelineCalculator.calculateTimeline(event.previousContainer.data);
    }
  }

  rotationFlightDropped(event: CdkDragDrop<Flight[]>): void {
    if (event.previousContainer !== event.container) {
      const tempRotationFlights = [...event.container.data];
      const tempAvailableFlights = [...event.previousContainer.data];
      transferArrayItem(tempAvailableFlights, tempRotationFlights, event.previousIndex, event.currentIndex);
      sortFlights(tempRotationFlights);

      const invalidFlightRotation = this.rotationValidatorService.validateRotation(tempRotationFlights);
      if(!invalidFlightRotation) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        sortFlights(event.container.data);
        this.aircraftUtilisationService.calculateAircraftUtilisation().subscribe();
        this.timelineCalculator.calculateTimeline(event.container.data);
      }
    }
  }

  getNextPage(): void {
      this.flightService.getNextPageOfData().subscribe();
  }
}
