import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public readonly spinnerVisible$: Observable<boolean>;

  private spinnerVisible = new BehaviorSubject<boolean>(true);

  constructor() {
    this.spinnerVisible$ = this.spinnerVisible.asObservable().pipe(
      shareReplay(1)
    );
   }

  showSpinner() {
    this.spinnerVisible.next(true);
  }

  hideSpinner() {
    this.spinnerVisible.next(false);
  }
}
