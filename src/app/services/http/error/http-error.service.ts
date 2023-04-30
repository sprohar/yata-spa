import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('client-side or network error occurred:', error.error);
      return throwError(() => error);
    }

    console.error(
      `Backend returned code ${error.status}, body was: `,
      error.error
    );

    return throwError(() => error);
  }
}
