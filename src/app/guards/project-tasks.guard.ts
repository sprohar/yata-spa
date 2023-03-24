import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { ProjectsService } from '../services/projects.service';
import { SidenavActions, YataApiActions } from '../store/actions';

export const projectTasksGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const projectId = parseInt(route.paramMap.get('projectId')!);

  return inject(ProjectsService)
    .get(projectId)
    .pipe(
      map((project) => {
        store.dispatch(
          SidenavActions.projectSelected({
            projectId,
          })
        );
        store.dispatch(
          YataApiActions.loadProjectSuccess({
            project,
          })
        );

        return true;
      }),
      catchError((error) => {
        store.dispatch(
          YataApiActions.loadTasksError({
            error,
          })
        );
        return of(false);
      })
    );
};
