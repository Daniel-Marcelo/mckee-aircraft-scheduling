import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Aircraft } from '../aircraft-service/aircraft.model';
import { AircraftService } from '../aircraft-service/aircraft.service';
import { AircraftUtilisationService } from '../aircraft-utilisation/aircraft-utilisation.service';
import { FlightRotationService } from '../flight-rotation/flight-rotation.service';
import { Flight, sortFlights } from '../flight-service/flight.model';
import { FlightService } from '../flight-service/flight.service';
import { Pagination } from '../pagination.model';
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
  public readonly pagination$: Observable<Pagination>;

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

  availableFlightDropped(event: CdkDragDrop<Flight[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      sortFlights(event.container.data);
      this.aircraftUtilisationService.calculateAircraftUtilisation().subscribe();
      this.rotationValidatorService.validateRotation(event.previousContainer.data);
    }
  }

  rotationFlightDropped(event: CdkDragDrop<Flight[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      sortFlights(event.container.data);
      this.aircraftUtilisationService.calculateAircraftUtilisation().subscribe();
      this.rotationValidatorService.validateRotation(event.container.data);
    }
  }

  // getPage(pageEvent: PageEvent) {

  //   const offset = pageEvent.pageIndex*pageEvent.pageSize;
  //   this.flightService.getFlights(offset, pageEvent.pageSize).subscribe();
  // }

  scrollFlights(listElement: HTMLElement) {
    // const scrollBarHeight = 

    if(Math.ceil(listElement.scrollTop) >= listElement.scrollHeight - listElement.offsetHeight) {
      this.flightService.getNextPageOfData().subscribe(); 
    }
  }

}
