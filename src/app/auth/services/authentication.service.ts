import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ApiService } from '../../services/api.service';
import { AuthActions } from '../../store/actions';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { AuthDto } from '../dto/auth.dto';

const authApiUrl = environment.auth.url;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends ApiService {
  private refreshTokenTimeout?: any | undefined;

  constructor(private http: HttpClient, private store: Store) {
    super();
  }

  logout() {
    const url = `${authApiUrl}/${environment.auth.endpoint.logout}`;
    return this.http.post(url, null);
  }

  signIn(dto: AuthDto) {
    const url = `${authApiUrl}/${environment.auth.endpoint.signIn}`;
    return this.http.post<AuthResponseDto>(url, dto).pipe(
      tap(() => this.startRefreshTokenTimer()),
      catchError(this.handleError)
    );
  }

  signUp(dto: AuthDto) {
    const url = `${authApiUrl}/${environment.auth.endpoint.signUp}`;
    return this.http.post<AuthResponseDto>(url, dto).pipe(
      tap(() => this.startRefreshTokenTimer()),
      catchError(this.handleError)
    );
  }

  refreshToken(returnUrl?: string) {
    const url = `${authApiUrl}/${environment.auth.endpoint.refreshToken}`;
    return this.http.post<AuthResponseDto>(url, null).pipe(
      tap(() => this.startRefreshTokenTimer(returnUrl)),
      catchError(this.handleError)
    );
  }

  startRefreshTokenTimer(returnUrl?: string) {
    if (this.refreshTokenTimeout !== undefined) {
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
}
