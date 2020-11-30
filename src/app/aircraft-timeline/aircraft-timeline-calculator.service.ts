import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { generateTimelineSlot, TimelineAction, TimelineSlot } from './timeline.model';
import { twentyFourHoursSeconds } from '../constants/time.constants';
import { Flight } from '../flights-state/flight.model';

// Calculates and generates timeline slots for use with the aircraft timeline component
@Injectable({
  providedIn: 'root'
})
export class AircraftTimelineCalculatorService {

  public readonly timelineSlots$: Observable<TimelineSlot[]>;
  private timelineSlotsSubject = new BehaviorSubject<TimelineSlot[]>([]);

  constructor() { 
    this.timelineSlots$ = this.timelineSlotsSubject.asObservable();
  }

  public calculateTimeline(flights: Flight[]): void {
    const timelineSlots = [] as TimelineSlot[];
    if (flights.length > 0) {

      // Calculate time before first flight idle
      timelineSlots.push(generateTimelineSlot(0, flights[0].departuretime, TimelineAction.idle));

      // Calculate remaining flights
      flights.slice(0, flights.length - 1).map((flight, index) => {
        const nextFlight = flights[index + 1];
        timelineSlots.push(
          generateTimelineSlot(flight.departuretime, flight.arrivaltime, TimelineAction.active),
          generateTimelineSlot(flight.arrivaltime, nextFlight.departuretime, TimelineAction.turnaroundTime)
        );
      })

      // Calculate last flight
      const lastFlight = flights[flights.length - 1];
      timelineSlots.push(
        generateTimelineSlot(lastFlight.departuretime, lastFlight.arrivaltime, TimelineAction.active),
        generateTimelineSlot(lastFlight.arrivaltime, twentyFourHoursSeconds, TimelineAction.idle)
      );
    }
    this.timelineSlotsSubject.next(timelineSlots);
  }
}
