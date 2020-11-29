import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Aircraft } from '../aircraft-service/aircraft.model';
import { AircraftService } from '../aircraft-service/aircraft.service';
import { AircraftUtilisationService } from '../aircraft-utilisation/aircraft-utilisation.service';
import { FlightRotationService } from '../flight-rotation/flight-rotation.service';
import { Flight, sortFlights } from '../flight-service/flight.model';
import { FlightService } from '../flight-service/flight.service';
import { Pagination } from '../pagination.model';
import { RotationValidatorService } from '../rotation-validator/rotation-validator.service';
import { twentyFourHoursSeconds } from '../time.constants';
import { generateTimelineSlot, TimelineAction, TimelineSlot } from './timeline.model';

@Component({
  selector: 'mckee-aircraft-scheduling',
  templateUrl: './aircraft-scheduling.component.html',
  styleUrls: ['./aircraft-scheduling.component.scss']
})
export class AircraftSchedulingComponent implements OnInit {

  public readonly flights$: Observable<Flight[]>;
  public readonly aircrafts$: Observable<Aircraft[]>;
  public readonly flightsInRotation$: Observable<Flight[]>;
  public readonly pagination$: Observable<Pagination>;

  public timelineSlots = [] as TimelineSlot[];

  constructor(private flightService: FlightService, private rotationValidatorService: RotationValidatorService, private aircraftService: AircraftService, private flightRotationService: FlightRotationService, private aircraftUtilisationService: AircraftUtilisationService) {
    this.flights$ = this.flightService.flights$;
    this.aircrafts$ = this.aircraftService.aircrafts$;
    this.flightsInRotation$ = this.flightRotationService.flights$;
    this.pagination$ = this.flightService.pagination$;
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
      this.calculateTimeline(event.previousContainer.data);
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
        this.calculateTimeline(event.container.data);
      }
    }
  }

  private calculateTimeline(flights: Flight[]): void {
    this.timelineSlots = [];
    if (flights.length > 0) {
      // Calculate time before first flight idle (if any)
      const firstFlight = flights[0];
      this.timelineSlots.push(generateTimelineSlot(0, firstFlight.departuretime, TimelineAction.idle));

      flights.slice(0, flights.length - 1).map((flight, index) => {
        const nextFlight = flights[index + 1];
        // Time active for this flight
        this.timelineSlots.push(
          generateTimelineSlot(flight.departuretime, flight.arrivaltime, TimelineAction.active),
          generateTimelineSlot(flight.arrivaltime, nextFlight.departuretime, TimelineAction.turnaroundTime)
        );
      })

      // Calculate last flight
      const lastFlight = flights[flights.length - 1];
      this.timelineSlots.push(
        generateTimelineSlot(lastFlight.departuretime, lastFlight.arrivaltime, TimelineAction.active),
        generateTimelineSlot(lastFlight.arrivaltime, twentyFourHoursSeconds, TimelineAction.idle)
      );
    }
  }

  scrollFlights(listElement: HTMLElement): void {
    if (Math.ceil(listElement.scrollTop) >= listElement.scrollHeight - listElement.offsetHeight) {
      this.flightService.getNextPageOfData().subscribe();
    }
  }
}
