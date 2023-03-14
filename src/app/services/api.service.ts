import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ApiErrorResponse } from '../interfaces/api-error-response';

export abstract class ApiService {
  protected handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    // Return an observable with a user-facing error message.
    // () => new Error('Something bad happened; please try again later.')
    return throwError(() => error.error as ApiErrorResponse);
  }
}
