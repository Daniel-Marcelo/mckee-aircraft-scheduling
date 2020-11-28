import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Aircraft } from '../aircraft-service/aircraft.model';
import { AircraftService } from '../aircraft-service/aircraft.service';
import { FlightRotationService } from '../flight-rotation/flight-rotation.service';
import { Flight } from '../flight-service/flight.model';
import { FlightService } from '../flight-service/flight.service';

@Component({
  selector: 'mckee-aircraft-scheduling',
  templateUrl: './aircraft-scheduling.component.html',
  styleUrls: ['./aircraft-scheduling.component.scss']
})
export class AircraftSchedulingComponent implements OnInit {

  public flights$: Observable<Flight[]>;
  public aircrafts$: Observable<Aircraft[]>;
  public flightsInRotation$: Observable<Flight[]>;

  constructor(private flightService: FlightService, private aircraftService: AircraftService, private flightRotationService: FlightRotationService) { }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe();
    this.flights$ = this.flightService.flights$;

    this.aircraftService.getAircrafts().subscribe();
    this.aircrafts$ = this.aircraftService.aircrafts$;

    this.flightsInRotation$ = this.flightRotationService.flights$;
  }

  availableFlightDropped(event: CdkDragDrop<Flight[]>, availableFlights: Flight[]){
    if(event.previousContainer !== event.container) {

    }
  }

  rotationDropped(event: CdkDragDrop<Flight[]>, flightsInRotation: Flight[]){
    if(event.previousContainer !== event.container) {

    }
  }
}
