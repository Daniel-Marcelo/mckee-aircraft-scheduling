import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TimelineSlot } from './timeline.model';
import { AircraftTimelineCalculatorService } from './aircraft-timeline-calculator.service';

// Displays at what points of the day the aircraft is active, idle or waiting for next flight (turnaround time)
@Component({
  selector: 'mckee-aircraft-timeline',
  templateUrl: './aircraft-timeline.component.html',
  styleUrls: ['./aircraft-timeline.component.scss']
})
export class AircraftTimelineComponent {

  public readonly timelineSlots$: Observable<TimelineSlot[]>;
  constructor(private timelineCalculator: AircraftTimelineCalculatorService) {
    this.timelineSlots$ = this.timelineCalculator.timelineSlots$;
   }
}
