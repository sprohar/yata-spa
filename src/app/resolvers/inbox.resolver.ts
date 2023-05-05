import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, forkJoin, map, switchMap, take, tap } from 'rxjs';
import { PaginatedList } from '../interfaces';
import { Project, Task } from '../models';
import { ProjectsService, TasksService } from '../services/http';
import { HttpErrorService } from '../services/http/error/http-error.service';
import { SidenavActions, YataApiActions } from '../store/actions';
import { selectInbox } from '../store/selectors';

export function inboxResolver() {
  const router = inject(Router);
  const store = inject(Store);
  const projectsService = inject(ProjectsService);
  const tasksService = inject(TasksService);
  const httpErrorService = inject(HttpErrorService);

  const inbox$ = store.select(selectInbox).pipe(
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

  const overdueTasks$ = tasksService
    .getAll({
      lt: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    })
    .pipe(
      take(1),
      map((res: PaginatedList<Task>) => res.data),
      catchError((error: HttpErrorResponse) => {
        store.dispatch(YataApiActions.serverError({ error }));
        return httpErrorService.handleError(error);
      })
    );

  return forkJoin({
    inbox: inbox$,
    overdueTasks: overdueTasks$,
  });
}
