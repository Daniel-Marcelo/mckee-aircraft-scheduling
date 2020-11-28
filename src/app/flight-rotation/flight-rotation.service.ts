import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight } from '../flight-service/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightRotationService {

  public readonly flights$: Observable<Flight[]>;
  private flights = new BehaviorSubject<Flight[]>([]);

  constructor() {
    this.flights$ = this.flights.asObservable();
   }
}
