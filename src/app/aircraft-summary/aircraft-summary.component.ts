import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Aircraft } from '../aircraft-service/aircraft.model';
import { AircraftUtilisationService } from '../aircraft-utilisation/aircraft-utilisation.service';

@Component({
  selector: 'mckee-aircraft-summary',
  templateUrl: './aircraft-summary.component.html',
  styleUrls: ['./aircraft-summary.component.scss']
})
export class AircraftSummaryComponent {

  @Input()
  public aircraft: Aircraft;

  public readonly aircraftUtilisation$: Observable<number>;

  constructor(private aircraftUtilisationService: AircraftUtilisationService) {
    this.aircraftUtilisation$ = this.aircraftUtilisationService.aircraftUtilisation$;
   }
}
