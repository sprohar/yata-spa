import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { ApiErrorResponse } from '../../error/api-error-response';
import { ProjectsService } from '../../services/projects.service';
import {
  AppActions,
  EditProjectDialogActions,
  KanbanViewActions,
  ListViewActions,
  ViewHeaderActions,
  YataApiActions,
} from '../actions/';
import { SidenavActions } from '../actions/sidenav.actions';

@Injectable()
export class ProjectsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly projectsService: ProjectsService,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SidenavActions.createProject),
      concatMap((action) =>
        this.projectsService.create(action.project).pipe(
          map((project) => {
            this.snackbar.open(`${project.name} was created.`);
            return YataApiActions.createProjectSuccess({ project });
          }),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.serverError({
                error,
              })
            )
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ViewHeaderActions.deleteProject, SidenavActions.deleteProject),
      mergeMap((action) =>
        this.projectsService.delete(action.project.id!).pipe(
          map((_) =>
            YataApiActions.deleteProjectSuccess({
              project: action.project,
            })
          ),
          tap(() => this.router.navigateByUrl('/')),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.serverError({
                error,
              })
            )
          )
        )
      )
    )
  );

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.onInit),
      switchMap(() =>
        this.projectsService.getAll().pipe(
          map((res) =>
            YataApiActions.loadProjectsSuccess({ projects: res.data })
          ),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.serverError({
                error,
              })
            )
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditProjectDialogActions.updateProject),
      concatMap((action) =>
        this.projectsService.update(action.project.id!, action.project).pipe(
          map((project) => {
            this.snackbar.open(`${project.name} was updated.`);
            return YataApiActions.updateProjectSuccess({ project });
          }),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.serverError({
                error,
              })
            )
          )
        )
      )
    )
  );

  changeView$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ListViewActions.switchToKanbanView,
        KanbanViewActions.switchToListView
      ),
      concatMap((action) =>
        this.projectsService.update(action.project.id!, action.project).pipe(
          map((project) => YataApiActions.updateProjectSuccess({ project })),
          catchError((error: ApiErrorResponse) =>
            of(
              YataApiActions.serverError({
                error,
              })
            )
          )
        )
      )
    )
  );
}
