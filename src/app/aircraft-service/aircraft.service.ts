import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { aircraftsUrl } from '../api.constants';
import { SpinnerService } from '../spinner/spinner.service';
import { Aircraft, GetAircraftResponse } from './aircraft.model';

@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  public readonly aircrafts$: Observable<Aircraft[]>
  private aircraftResponse$ = new BehaviorSubject<GetAircraftResponse>(null);

  constructor(private spinnerService: SpinnerService, private http: HttpClient) {
    this.aircrafts$ = this.aircraftResponse$.asObservable().pipe(
      filter(aircraftResponse => !!aircraftResponse),
      map(aircraftResponse => aircraftResponse.data)
    );
   }
   
  getAircrafts(): Observable<GetAircraftResponse> {
    return of(null).pipe(
      tap(() => this.spinnerService.showSpinner()),
      switchMap(() =>this.http.get<GetAircraftResponse>(aircraftsUrl)),
      tap(aircraftsInfo => console.log("Successfully retrieved list of available aircrafts")),
      tap(aircraftsInfo => this.aircraftResponse$.next(aircraftsInfo)),
      catchError(error => {
        console.error('Failed to retrieve list of available aircrafts');
        return throwError(error);
      }),
      finalize(() => this.spinnerService.hideSpinner())
    )
  }
}
