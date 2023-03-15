import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../../store/reducers/auth.reducer';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectAccessToken).pipe(
      switchMap((jwt: string | null) => {
        if (!jwt) {
          return next.handle(req);
        }

        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        return next.handle(authReq);
      })
    );
  }
}
