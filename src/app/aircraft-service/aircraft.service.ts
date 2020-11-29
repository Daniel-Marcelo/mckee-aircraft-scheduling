import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { aircraftsUrl } from '../api.constants';
import { Aircraft, GetAircraftResponse } from './aircraft.model';

@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  public readonly aircrafts$: Observable<Aircraft[]>
  private aircraftResponse$ = new BehaviorSubject<GetAircraftResponse>(null);

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.aircrafts$ = this.aircraftResponse$.asObservable().pipe(
      filter(aircraftResponse => !!aircraftResponse),
      map(aircraftResponse => aircraftResponse.data)
    );
   }
   
  getAircrafts(): Observable<GetAircraftResponse> {
    return this.http.get<GetAircraftResponse>(aircraftsUrl).pipe(
      tap(aircraftsInfo => console.log("Successfully retrieved list of available aircrafts")),
      tap(aircraftsInfo => this.aircraftResponse$.next(aircraftsInfo)),
      catchError((error: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: `Error retrieving list of aircrafts`, sticky: true });
        console.error('Failed to retrieve list of available aircrafts');
        return of(null);
      })
    )
  }
}
