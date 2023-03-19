import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ApiService } from '../../services/api.service';
import { AuthActions } from '../../store/actions';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { AuthDto } from '../dto/auth.dto';

const authApiUrl =  environment.auth.url;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends ApiService {
  private refreshTokenTimeout?: any | undefined;

  constructor(private http: HttpClient, private store: Store) {
    super();
  }

  signIn(dto: AuthDto) {
    const url = `${authApiUrl}/sign-in`;
    return this.http.post<AuthResponseDto>(url, dto).pipe(
      tap(() => this.startRefreshTokenTimer()),
      catchError(this.handleError)
    );
  }

  signUp(dto: AuthDto) {
    const url = `${authApiUrl}/sign-up`;
    return this.http
      .post<AuthResponseDto>(url, dto)
      .pipe(catchError(this.handleError));
  }

  refreshToken() {
    const url = `${authApiUrl}/refresh-tokens`;
    return this.http
      .post<AuthResponseDto>(url, null)
      .pipe(catchError(this.handleError));
  }

  startRefreshTokenTimer() {
    if (this.refreshTokenTimeout) {
      this.stopRefreshTokenTimer();
    }

    const ttl = environment.auth.token.ttl;
    const oneMinuteInSeconds = 60;
    const timeoutSeconds = ttl - oneMinuteInSeconds;
    const timeoutMilliseconds = timeoutSeconds * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.store.dispatch(AuthActions.refreshToken()),
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
