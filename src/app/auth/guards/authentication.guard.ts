import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap } from 'rxjs';
import { selectUser } from '../../store/reducers/auth.reducer';

export const authGuard: CanMatchFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const state = router.routerState.snapshot;

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
};
