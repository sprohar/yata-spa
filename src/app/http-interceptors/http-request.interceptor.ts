import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthResponseDto } from '../auth/dto';
import { AuthenticationService } from '../auth/services/authentication.service';
import { AuthActions, AuthApiActions } from '../store/actions';
import { selectUser } from '../store/reducers/auth.reducer';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;

  constructor(
    private readonly auth: AuthenticationService,
    private readonly store: Store
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === HttpStatusCode.Unauthorized &&
          !req.url.includes('api/auth')
        ) {
          return this.handleExpiredAccessToken(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handleExpiredAccessToken(req: HttpRequest<any>, next: HttpHandler) {
    if (this.isRefreshingToken) return next.handle(req);

    this.isRefreshingToken = true;

    return this.store.select(selectUser).pipe(
      switchMap((user) => {
        this.isRefreshingToken = false;

        if (!user) return next.handle(req);

        // The token expired. Use the refresh token to get a fresh token.
        return this.auth.refreshToken().pipe(
          switchMap((res: AuthResponseDto) => {
            this.store.dispatch(
              AuthApiActions.refreshTokenSuccess({
                res,
              })
            );

            return next.handle(req);
          }),
          catchError((error) => {
            this.isRefreshingToken = false;

            if (error.status === HttpStatusCode.Forbidden) {
              this.store.dispatch(AuthActions.logout());
            }

            return throwError(() => error);
          })
        );
      })
    );
  }
}
