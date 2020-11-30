import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { aircraftsUrl } from '../constants/api.constants';
import { SpinnerService } from '../spinner/spinner.service';
import { Aircraft, GetAircraftResponse } from './aircraft.model';

@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  public readonly aircrafts$: Observable<Aircraft[]>
  private aircraftResponse$ = new BehaviorSubject<GetAircraftResponse>(null);

  constructor(private spinnerService: SpinnerService, private http: HttpClient, private messageService: MessageService) {
    this.aircrafts$ = this.aircraftResponse$.asObservable().pipe(
      filter(aircraftResponse => !!aircraftResponse),
      map(aircraftResponse => aircraftResponse.data)
    );
  }

  getAircrafts(): Observable<GetAircraftResponse> {
    return of(null).pipe(
      tap(() => this.spinnerService.showSpinner()),
      switchMap(() => this.http.get<GetAircraftResponse>(aircraftsUrl)),
      tap(() => console.log("Successfully retrieved list of available aircrafts")),
      tap(aircraftsInfo => this.aircraftResponse$.next(aircraftsInfo)),
      catchError(error => this.handleError(error)),
      finalize(() => this.spinnerService.hideSpinner())
    )
  }

  private handleError(error: HttpErrorResponse): Observable<GetAircraftResponse> {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error retrieving aircraft(s)`, sticky: true });
    console.error('Failed to retrieve aircraft(s)');
    console.error(error);
    return of(null);
  }
}
