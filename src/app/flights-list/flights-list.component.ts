import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../flight-service/flight.model';

@Component({
  selector: 'mckee-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.scss']
})
export class FlightsListComponent {
  public readonly flights$: Observable<Flight[]>;

  @Input()
  public flights: Flight[];

  @Input()
  listId: string;

  @Input()
  connectedTo: string;

  @Output()
  public flightDropped = new EventEmitter<CdkDragDrop<Flight[]>>();

  availableFlightDropped(event: CdkDragDrop<Flight[]>): void {
    this.flightDropped.next(event);
  }
}
