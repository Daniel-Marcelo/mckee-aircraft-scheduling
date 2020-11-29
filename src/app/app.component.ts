import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner/spinner.service';

@Component({
  selector: 'mckee-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aircraft-scheduling-app';

  public readonly spinnerVisible$: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerVisible$ = this.spinnerService.spinnerVisible$;
  }
}
