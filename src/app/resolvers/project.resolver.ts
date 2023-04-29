import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { ApiErrorResponse } from '../error';
import { Project } from '../models';
import { ProjectsService } from '../services/http';
import { SidenavActions, YataApiActions } from '../store/actions';

export function projectResolver(
  route: ActivatedRouteSnapshot
): Observable<Project> {
  const router = inject(Router);
  const projectId = parseInt(route.paramMap.get('projectId') ?? '');

  if (!projectId) {
    router.navigateByUrl('/app');
    return EMPTY;
  }

  const store = inject(Store);

  return inject(ProjectsService)
    .get(projectId)
    .pipe(
      tap((project: Project) => {
        store.dispatch(SidenavActions.projectSelected({ projectId }));
        store.dispatch(YataApiActions.loadProjectSuccess({ project }));
      }),
      catchError((error: ApiErrorResponse) => {
        store.dispatch(YataApiActions.loadProjectError({ error }));
        router.navigateByUrl('/app');
        return EMPTY;
      })
    );
}
