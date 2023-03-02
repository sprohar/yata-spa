import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap, tap } from 'rxjs';
import { KanbanViewActions } from '../store/actions';
import { selectCurrentTaskId } from '../store/reducers/tasks.reducer';

export const taskDetailsGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const taskId = parseInt(route.paramMap.get('taskId')!);
  store.dispatch(KanbanViewActions.setCurrentTaskId({ taskId }));
  return store.select(selectCurrentTaskId).pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};
