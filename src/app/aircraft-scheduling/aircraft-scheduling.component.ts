import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Aircraft } from '../aircraft-service/aircraft.model';
import { AircraftService } from '../aircraft-service/aircraft.service';
import { AircraftUtilisationService } from '../aircraft-utilisation/aircraft-utilisation.service';
import { FlightRotationService } from '../flight-rotation/flight-rotation.service';
import { Flight, sortFlights } from '../flight-service/flight.model';
import { FlightService } from '../flight-service/flight.service';
import { FlightsListComponent } from '../flights-list/flights-list.component';
import { RotationValidatorService } from '../rotation-validator/rotation-validator.service';

@Component({
  selector: 'mckee-aircraft-scheduling',
  templateUrl: './aircraft-scheduling.component.html',
  styleUrls: ['./aircraft-scheduling.component.scss']
})
export class AircraftSchedulingComponent implements OnInit {

  public readonly flights$: Observable<Flight[]>;
  public readonly aircrafts$: Observable<Aircraft[]>;
  public readonly flightsInRotation$: Observable<Flight[]>;

  constructor(private flightService: FlightService, private rotationValidatorService: RotationValidatorService, private aircraftService: AircraftService, private flightRotationService: FlightRotationService, private aircraftUtilisationService: AircraftUtilisationService) {
    this.flights$ = this.flightService.flights$;
    this.aircrafts$ = this.aircraftService.aircrafts$;
    this.flightsInRotation$ = this.flightRotationService.flights$;
   }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe();
    this.aircraftService.getAircrafts().subscribe();
  }

  availableFlightDropped(event: CdkDragDrop<Flight[]>) {
    this.flightDraggedDropped(event)
  }

  rotationFlightDropped(event: CdkDragDrop<Flight[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      sortFlights(event.container.data);
      this.aircraftUtilisationService.calculateAircraftUtilisation().subscribe();
      this.rotationValidatorService.validateRotation(event.container.data);
    }
  }

  private flightDraggedDropped(event: CdkDragDrop<Flight[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

  }
}
