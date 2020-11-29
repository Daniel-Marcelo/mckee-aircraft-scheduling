import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { flightsUrl } from '../api.constants';
import { Flight, GetFlightsResponse, sortFlights } from './flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  public readonly flights$: Observable<Flight[]>
  private flightsResponse$ = new BehaviorSubject<GetFlightsResponse>(null);

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.flights$ = this.flightsResponse$.asObservable().pipe(
      filter(flightResponse => !!flightResponse),
      map(flightResponse => flightResponse.data),
      tap(flights => sortFlights(flights))
    );
  }

  getFlights(): Observable<GetFlightsResponse> {
    return this.http.get<GetFlightsResponse>(flightsUrl).pipe(
      tap(flightsInfo => console.log("Successfully retrieved list of available flights")),
      tap(flightsInfo => this.flightsResponse$.next(flightsInfo)),
      catchError((error: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: `Error retrieving list of available flights`, sticky: true });
        console.error('Failed to retrieve list of available flights');
        return of(null);
      })
    )
  }
}
