import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
// import { CachingInterceptor } from './caching.interceptor';
// import { JwtInterceptor } from './jwt.interceptor';

export const httpInterceptors: Provider[] = [
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: CachingInterceptor,
  //   multi: true,
  // },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: JwtInterceptor,
  //   multi: true,
  // },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  },
];
