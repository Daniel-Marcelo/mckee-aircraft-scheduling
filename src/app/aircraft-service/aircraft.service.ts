import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { aircraftsUrl } from '../api.constants';
import { Aircraft, GetAircraftResponse } from './aircraft.model';

@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  private readonly 
  public readonly aircrafts$: Observable<Aircraft[]>
  private aircraftResponse$ = new BehaviorSubject<GetAircraftResponse>(null);

  constructor(private http: HttpClient) {
    this.aircrafts$ = this.aircraftResponse$.asObservable().pipe(
      filter(aircraftResponse => !!aircraftResponse),
      map(aircraftResponse => aircraftResponse.data)
    );
   }
   
  getAircrafts() {
    return this.http.get<GetAircraftResponse>(aircraftsUrl).pipe(
      tap(aircraftsInfo => console.log("Successfully retrieved list of available aircrafts")),
      tap(aircraftsInfo => this.aircraftResponse$.next(aircraftsInfo)),
      catchError(error => {
        console.error('Failed to retrieve list of available aircrafts');
        return throwError(error);
      })
    )
  }
}
