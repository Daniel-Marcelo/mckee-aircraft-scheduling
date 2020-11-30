import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TimelineSlot } from '../aircraft-scheduling/timeline.model';
import { AircraftTimelineCalculatorService } from './aircraft-timeline-calculator.service';

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
