import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, of, share, switchMap, take } from 'rxjs';
import { selectUser } from '../../store/reducers/auth.reducer';

export function authenticationGuard(
  route: ActivatedRouteSnapshot,
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
      return EMPTY;
    }),
    take(1),
    share(),
    catchError(() => of(false))
  );
}
