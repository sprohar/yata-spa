import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { environment } from '../../environment/environment';
import { ApiErrorResponse } from '../interfaces/api-error-response';
import { AuthActions } from '../store/actions';

function reauthenticate(store = inject(Store)) {
  store.dispatch(AuthActions.refreshToken({ returnUrl: '/app' }));
}

export abstract class YataApiService {
  protected readonly baseUrl = environment.api.baseUrl;

  protected handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      return throwError(() => error);
    }

    console.error(
      `Backend returned code ${error.status}, body was: `,
      error.error
    );

    if (error.status !== HttpStatusCode.Unauthorized)
      return throwError(() => error.error as ApiErrorResponse);

    const authEndpoints: string[] = environment.auth.endpoints;
    for (const authEndpoint of authEndpoints) {
      if (error.url && !error.url.includes(authEndpoint)) {
        reauthenticate();
      }
    }

    return throwError(() => error.error as ApiErrorResponse);
  }
}
