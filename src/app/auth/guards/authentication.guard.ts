import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap } from 'rxjs';
import { selectIsAuthenticated } from '../../store/reducers/auth.reducer';

export function authenticationGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    switchMap((isAuthenticated) => {
      if (isAuthenticated) {
        return of(true);
      }
      router.navigate(['/auth/sign-in'], {
        queryParams: {
          returnUrl: state.url,
        },
      });
      return of(false);
    }),
    catchError(() => of(false))
  );
}
