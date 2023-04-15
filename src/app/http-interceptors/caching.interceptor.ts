import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private readonly cache = new Map<HttpRequest<any>, HttpResponse<any>>();

  isCacheable(req: HttpRequest<any>) {
    return req.method === 'GET';
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.cache.set(req, event.clone());
        }
      })
    );
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isCacheable(request)) return next.handle(request);
    const cachedResponse = this.cache.get(request);
    return cachedResponse
      ? of(cachedResponse)
      : this.sendRequest(request, next);
  }
}
