import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

// Used to show and hide the app-level progress spinner
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public readonly spinnerVisible$: Observable<boolean>;
  private spinnerVisible = new BehaviorSubject<boolean>(true);

  constructor() {
    this.spinnerVisible$ = this.spinnerVisible.asObservable();
   }

  showSpinner(): void {
    this.spinnerVisible.next(true);
  }

  hideSpinner(): void {
    this.spinnerVisible.next(false);
  }
}
