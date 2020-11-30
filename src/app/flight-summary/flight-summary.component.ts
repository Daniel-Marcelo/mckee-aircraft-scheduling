import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Flight } from '../flights-state/flight.model';

// Single flight summary wrapped in a mat-card
@Component({
  selector: 'mckee-flight-summary',
  templateUrl: './flight-summary.component.html',
  styleUrls: ['./flight-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightSummaryComponent {

  @Input()
  public flight: Flight;
}
