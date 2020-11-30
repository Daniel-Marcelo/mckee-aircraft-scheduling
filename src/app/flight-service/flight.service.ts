import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, take, tap } from 'rxjs/operators';
import { flightsUrl } from '../constants/api.constants';
import { FlightRotationService } from '../flight-rotation/flight-rotation.service';
import { Pagination } from './pagination.model';
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

  getNextPageOfData(): Observable<GetFlightsResponse> {
    // Will not attempt to get the next page of data if there is a request running
    // Or we have the last page of data
    return this.pagination$.pipe(take(1),
      filter(pagination => !this.isRequestInFlight && !this.isLastPageOfData(pagination)),
      tap(pagination => this.isRequestInFlight = true),
      switchMap(pagination => this.getFlights(pagination.offset + pagination.limit))
    );
  }

  getFlights(offset = 0): Observable<GetFlightsResponse> {
    return of(null).pipe(
      tap(() => this.spinnerService.showSpinner()),
      switchMap(() => this.http.get<GetFlightsResponse>(flightsUrl(offset))),
      tap(flightsResponse => this.handleSuccess(flightsResponse, offset)),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      finalize(() => this.spinnerService.hideSpinner())
    )
  }

  private isLastPageOfData(pagination: Pagination): boolean {
    return pagination.offset + pagination.limit >= pagination.total;
  }

  private handleSuccess(flightsResponse: GetFlightsResponse, offset: number): void {
    console.log("Successfully retrieved list of available flights")
    let flights = flightsResponse.data;
    this.isRequestInFlight = false;

    if (offset !== 0) {
      const existingFlights = this.flightsResponseSubject.getValue().data;
      flights = [...existingFlights, ...flightsResponse.data];
    }

    this.flightsResponseSubject.next({
      ...flightsResponse,
      data: flights
    });
  }

  private handleError(error: HttpErrorResponse): Observable<GetFlightsResponse> {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error retrieving list of available flights`, sticky: true });
    console.error('Failed to retrieve list of available flights');
    console.error(error);
    return of(null);
  }
}
