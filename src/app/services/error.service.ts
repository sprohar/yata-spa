import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly errorSubject = new Subject<string>();
  error$ = this.errorSubject.asObservable();

  constructor() {}

  setErrorMessage(message: string) {
    this.errorSubject.next(message);
  }
}
