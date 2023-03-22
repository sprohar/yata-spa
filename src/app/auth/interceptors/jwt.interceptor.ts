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
import { environment } from '../../../environment/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes(environment.api.baseUrl)) {
      return next.handle(req);
    }

    return this.store.select(selectAccessToken).pipe(
      switchMap((jwt: string | null) => {
        if (!jwt) {
          return next.handle(
            req.clone({
              withCredentials: true,
            })
          );
        }

        const authReq = req.clone({
          withCredentials: true,
          setHeaders: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        return next.handle(authReq);
      })
    );
  }
}
