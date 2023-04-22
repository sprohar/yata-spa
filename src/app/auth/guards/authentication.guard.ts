import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, of, switchMap } from 'rxjs';
import { selectUser } from '../../store/reducers/auth.reducer';

export function authenticationGuard(
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUser).pipe(
    switchMap((user) => {
      if (user) {
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
