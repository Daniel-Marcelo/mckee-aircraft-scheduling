import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Aircraft } from '../aircrafts-state/aircraft.model';
import { AircraftService } from '../aircrafts-state/aircrafts-state.service';
import { isScrollBarAtBottom } from '../constants/scroll.constants';
import { FlightsDragDropProcessorService } from '../drag-drop-processor/flights-drag-drop-processor.service';
import { RotationDragDropProcessorService } from '../drag-drop-processor/rotation-drag-drop-processor.service';
import { FlightRotationStateService } from '../flight-rotation-state/flight-rotation-state.service';
import { Flight } from '../flights-state/flight.model';
import { FlightsStateService } from '../flights-state/flights-state.service';

/*
 * Component serves as the container for the 3 main sections of the app.
 * The list of aircrafts, flights in the rotation and available flights.
 */
@Component({
  selector: 'mckee-aircraft-scheduling',
  templateUrl: './aircraft-scheduling.component.html',
  styleUrls: ['./aircraft-scheduling.component.scss']
})
export class AircraftSchedulingComponent implements OnInit {

  public readonly flights$: Observable<Flight[]>;
  public readonly aircrafts$: Observable<Aircraft[]>;
  public readonly flightsInRotation$: Observable<Flight[]>;

  constructor(
    private flightsStateService: FlightsStateService,
    private aircraftService: AircraftService,
    private flightRotationService: FlightRotationStateService,
    private flightsDragDropProcessor: FlightsDragDropProcessorService,
    private rotationDragDropProcessor: RotationDragDropProcessorService) {
    this.flights$ = this.flightsStateService.flights$;
    this.aircrafts$ = this.aircraftService.aircrafts$;
    this.flightsInRotation$ = this.flightRotationService.flights$;
  }

  ngOnInit(): void {
    this.flightsStateService.getFlights().subscribe();
    this.aircraftService.getAircrafts().subscribe();
  }

  availableFlightDropped(event: CdkDragDrop<Flight[]>): void {
    this.flightsDragDropProcessor.availableFlightDropped(event);
  }

  rotationFlightDropped(event: CdkDragDrop<Flight[]>): void {
    this.rotationDragDropProcessor.rotationFlightDropped(event);
  }

  getNextPage(): void {
    this.flightsStateService.getNextPageOfData().subscribe();
  }

  scrollFlights(listElement: HTMLElement): void {
    if (isScrollBarAtBottom(listElement)) {
      this.flightsStateService.getNextPageOfData().subscribe();
    }
  }
}
