import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap } from 'rxjs';
import { SidenavActions } from '../store/actions';
import { selectTasks } from '../store/reducers/tasks.reducer';

export const projectTasksGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const projectId = parseInt(route.paramMap.get('projectId')!);
  store.dispatch(
    SidenavActions.projectSelected({
      projectId,
    })
  );

  return store.select(selectTasks).pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};
