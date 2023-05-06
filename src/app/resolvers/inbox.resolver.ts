import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, switchMap, take, tap } from 'rxjs';
import { Project } from '../models';
import { ProjectsService } from '../services/http';
import { SidenavActions, YataApiActions } from '../store/actions';
import { selectInbox } from '../store/selectors';

export function inboxResolver() {
  const router = inject(Router);
  const store = inject(Store);
  const projectsService = inject(ProjectsService);

  return store.select(selectInbox).pipe(
    take(1),
    switchMap((inbox: Project | undefined) => {
      if (inbox === undefined) {
        router.navigateByUrl('/');
        return EMPTY;
      }

      return projectsService.get(inbox.id!).pipe(
        take(1),
        tap((project: Project) => {
          store.dispatch(
            SidenavActions.projectSelected({ projectId: project.id! })
          );
          store.dispatch(YataApiActions.loadProjectSuccess({ project }));
        }),
        catchError((error: HttpErrorResponse) => {
          store.dispatch(YataApiActions.serverError({ error }));
          router.navigateByUrl('/app');
          return EMPTY;
        })
      );
    })
  );
}
