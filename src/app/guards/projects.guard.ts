import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { ProjectsService } from '../services/http';
import { YataApiActions } from '../store/actions';

export function projectsGuard(
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) {
  const store = inject(Store);
  return inject(ProjectsService)
    .getAll()
    .pipe(
      map((res) => {
        store.dispatch(
          YataApiActions.loadProjectsSuccess({
            projects: res.data,
          })
        );
        return true;
      }),
      catchError((error) => {
        store.dispatch(
          YataApiActions.loadProjectsError({
            error,
          })
        );
        return of(false);
      })
    );
}
