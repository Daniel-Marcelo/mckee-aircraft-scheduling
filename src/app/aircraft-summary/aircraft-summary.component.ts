import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Aircraft } from '../aircrafts-state/aircraft.model';
import { AircraftUtilisationCalculatorService } from '../aircraft-utilisation-calculator/aircraft-utilisation-calculator.service';

// Displays a single aircraft summary within a mat-card
@Component({
  selector: 'mckee-aircraft-summary',
  templateUrl: './aircraft-summary.component.html',
  styleUrls: ['./aircraft-summary.component.scss']
})
export class AircraftSummaryComponent {

  @Input()
  public aircraft: Aircraft;

  public readonly aircraftUtilisation$: Observable<number>;

  constructor(private aircraftUtilisationService: AircraftUtilisationCalculatorService) {
    this.aircraftUtilisation$ = this.aircraftUtilisationService.aircraftUtilisation$;
   }
}
