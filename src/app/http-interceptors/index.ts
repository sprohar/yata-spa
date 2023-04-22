import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
// import { CachingInterceptor } from './caching.interceptor';
import { JwtInterceptor } from './jwt.interceptor';

export const httpInterceptorProviders: Provider[] = [
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: CachingInterceptor,
  //   multi: true,
  // },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
  },
];
