import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map } from 'rxjs';
import { PaginatedList } from '../interfaces';
import { Project } from '../models';
import { ProjectsService } from '../services/http';
import { YataApiActions } from '../store/actions';

export function projectsResolver() {
  const router = inject(Router);
  const store = inject(Store);

  return inject(ProjectsService)
    .getAll()
    .pipe(
      map((res: PaginatedList<Project>) => {
        store.dispatch(
          YataApiActions.loadProjectsSuccess({
            projects: res.data,
          })
        );
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        store.dispatch(
          YataApiActions.serverError({
            error,
          })
        );

        router.navigateByUrl('/app');
        return EMPTY;
      })
    );
}
