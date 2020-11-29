import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { flightsUrl } from '../api.constants';
import { FlightRotationService } from '../flight-rotation/flight-rotation.service';
import { Pagination } from '../pagination.model';
import { SpinnerService } from '../spinner/spinner.service';
import { Flight, GetFlightsResponse, sortFlights } from './flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  public readonly flights$: Observable<Flight[]>
  public readonly pagination$: Observable<Pagination>;
  private flightsResponseSubject = new BehaviorSubject<GetFlightsResponse>(null);
  private isRequestInFlight = false;

  constructor(private http: HttpClient, private messageService: MessageService, private rotationService: FlightRotationService, private spinnerService: SpinnerService) {
    const flightsResponse$ = this.flightsResponseSubject.asObservable().pipe(
      filter(flightResponse => !!flightResponse));

    this.flights$ = flightsResponse$.pipe(
      map(flightResponse => flightResponse.data),
      tap(flights => sortFlights(flights))
    );

    this.pagination$ = flightsResponse$.pipe(
      map(flightsResponse => flightsResponse.pagination)
    );
  }

  getNextPageOfData() {
    return this.pagination$.pipe(take(1),
      filter(pagination => !this.isRequestInFlight && !this.isLastPageOfData(pagination)),
      tap(pagination => this.isRequestInFlight = true),
      switchMap(pagination => this.getFlights(pagination.offset + pagination.limit, pagination.limit))
    );
  }

  private isLastPageOfData(pagination: Pagination) {
    return pagination.offset + pagination.limit >= pagination.total;
  }

  getFlights(offset = 0, limit = 25): Observable<GetFlightsResponse> {
    return of(null).pipe(
      tap(() => this.spinnerService.showSpinner()),
      switchMap(() => this.http.get<GetFlightsResponse>(flightsUrl(offset, limit))),
      tap(flightsInfo => console.log("Successfully retrieved list of available flights")),
      withLatestFrom(this.rotationService.flights$),
      take(1),
      tap(([flightsResponse, rotationFlights]) => this.handleSuccess(flightsResponse, rotationFlights, offset)),
      catchError((error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error retrieving list of available flights`, sticky: true });
        console.error('Failed to retrieve list of available flights');
        return of(null);
      }),
      finalize(() => this.spinnerService.hideSpinner())
    )
  }

  handleSuccess(flightsResponse: GetFlightsResponse, rotationFlights: Flight[], offset: number) {
    this.isRequestInFlight = false;
    let flights = flightsResponse.data;
    if (offset !== 0) {
      const existingData = this.flightsResponseSubject.getValue().data;
      flights = [...existingData, ...flightsResponse.data];
    }

    this.flightsResponseSubject.next({
      ...flightsResponse,
      data: flights
    });
  }
}
