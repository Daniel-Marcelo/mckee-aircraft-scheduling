import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public readonly spinnerVisible$: Observable<boolean>;

  private spinnerVisible = new BehaviorSubject<boolean>(false);

  constructor() {
    this.spinnerVisible$ = this.spinnerVisible.asObservable();
   }

  showSpinner() {
    this.spinnerVisible.next(true);
  }

  hideSpinner() {
    this.spinnerVisible.next(false);
  }
}
