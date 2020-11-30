import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Aircraft } from '../aircraft-service/aircraft.model';
import { AircraftService } from '../aircraft-service/aircraft.service';
import { FlightsDragDropProcessorService } from '../drag-drop-processor/flights-drag-drop-processor.service';
import { RotationDragDropProcessorService } from '../drag-drop-processor/rotation-drag-drop-processor.service';
import { FlightRotationService } from '../flight-rotation/flight-rotation.service';
import { Flight } from '../flight-service/flight.model';
import { FlightService } from '../flight-service/flight.service';

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
    private flightService: FlightService,
    private aircraftService: AircraftService,
    private flightRotationService: FlightRotationService,
    private flightsDragDropProcessor: FlightsDragDropProcessorService,
    private rotationDragDropProcessor: RotationDragDropProcessorService) {
    this.flights$ = this.flightService.flights$;
    this.aircrafts$ = this.aircraftService.aircrafts$;
    this.flightsInRotation$ = this.flightRotationService.flights$;
  }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe();
    this.aircraftService.getAircrafts().subscribe();
  }

  availableFlightDropped(event: CdkDragDrop<Flight[]>): void {
    this.flightsDragDropProcessor.availableFlightDropped(event);
  }

  rotationFlightDropped(event: CdkDragDrop<Flight[]>): void {
    this.rotationDragDropProcessor.rotationFlightDropped(event);
  }

  getNextPage(): void {
    this.flightService.getNextPageOfData().subscribe();
  }

  scrollFlights(listElement: HTMLElement): void {
    if (Math.ceil(listElement.scrollTop) >= listElement.scrollHeight - listElement.offsetHeight) {
      this.flightService.getNextPageOfData().subscribe();
    }
  }
}
