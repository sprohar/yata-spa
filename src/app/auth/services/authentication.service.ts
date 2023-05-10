import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, of, take, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiErrorResponse } from '../../error/api-error-response';
import { AuthActions } from '../../store/actions';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { AuthDto } from '../dto/auth.dto';
import { mockAuthResponse } from '../../__mock';

const authApiUrl = environment.auth.serverUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private refreshTokenTimeout: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store
  ) {}

  logout() {
    if (this.refreshTokenTimeout) {
      this.stopRefreshTokenTimer();
    }
    const url = `${authApiUrl}/${environment.auth.endpoint.logout}`;
    return this.http
      .post(url, null)
      .pipe(take(1), catchError(this.handleError));
  }

  signIn(dto: AuthDto) {
    const url = `${authApiUrl}/${environment.auth.endpoint.signIn}`;
    return this.http.post<AuthResponseDto>(url, dto).pipe(
      tap(() => this.startRefreshTokenTimer()),
      take(1),
      catchError(this.handleError)
    );
  }

  signUp(dto: AuthDto) {
    const url = `${authApiUrl}/${environment.auth.endpoint.signUp}`;
    return this.http.post<AuthResponseDto>(url, dto).pipe(
      tap(() => this.startRefreshTokenTimer()),
      take(1),
      catchError(this.handleError)
    );
  }

  refreshToken(returnUrl?: string): Observable<AuthResponseDto> {
    return of(mockAuthResponse);
  }

  startRefreshTokenTimer(returnUrl?: string) {
    if (this.refreshTokenTimeout) {
      this.stopRefreshTokenTimer();
    }

    const ttl = environment.auth.token.ttl;
    const oneMinuteInSeconds = 60;
    const timeoutSeconds = ttl - oneMinuteInSeconds;
    const timeoutMilliseconds = timeoutSeconds * 1000;
    this.refreshTokenTimeout = setTimeout(
      () =>
        this.store.dispatch(
          AuthActions.refreshToken({
            returnUrl,
          })
        ),
      timeoutMilliseconds
    );
    console.log('rt_timeout has been set');
  }

  stopRefreshTokenTimer() {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
      console.log('rt_timeout has been cleared');
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error);
      return throwError(() => error);
    }

    return throwError(() => error.error as ApiErrorResponse);
  }
}
