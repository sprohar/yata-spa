import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap } from 'rxjs';
import { EisenhowerMatrixActions } from '../../store/actions';
import { selectTasks } from '../../store/selectors';

export const eisenhowerMatrixGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const store = inject(Store);
  store.dispatch(EisenhowerMatrixActions.onInit());
  return store.select(selectTasks).pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};
