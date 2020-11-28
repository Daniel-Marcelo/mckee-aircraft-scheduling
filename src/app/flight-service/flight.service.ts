import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Flight, GetFlightsResponse } from './flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  public readonly flights$: Observable<Flight[]>
  private flightsResponse$ = new BehaviorSubject<GetFlightsResponse>(null);

  constructor(private http: HttpClient) {
    this.flights$ = this.flightsResponse$.asObservable().pipe(
      filter(flightResponse => !!flightResponse),
      map(flightResponse => flightResponse.data)
    );
   }

  getFlights() {
    return this.http.get<GetFlightsResponse>('https://infinite-dawn-93085.herokuapp.com/flights').pipe(
      tap(flightsInfo => console.log("Successfully retrieved list of available flights")),
      tap(flightsInfo => this.flightsResponse$.next(flightsInfo)),
      catchError(error => {
        console.error('Failed to retrieve list of available flights');
        return throwError(error);
      })
    )
  }
}
