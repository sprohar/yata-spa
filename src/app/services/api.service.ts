import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { environment } from '../../environment/environment';
import { ApiErrorResponse } from '../interfaces/api-error-response';
import { AuthActions } from '../store/actions';

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

    const authEndpoints: string[] = environment.auth.endpoints;
    const url: string | null = error.url;
    if (
      url &&
      error.status === HttpStatusCode.Unauthorized &&
      authEndpoints.some((endpoint) => url.includes(endpoint))
    ) {
      inject(Store).dispatch(AuthActions.refreshToken());
    }

    return throwError(() => error.error as ApiErrorResponse);
  }
}
