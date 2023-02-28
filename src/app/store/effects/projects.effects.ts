import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';
import { SidenavActions } from '../actions/sidenav.actions';
import {
  KanbanViewActions,
  ListViewActions,
  ViewHeaderActions,
  YataApiActions,
} from '../actions/';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private snackbar: MatSnackBar,
    private router: Router
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
          catchError(() =>
            of(
              YataApiActions.createProjectError({
                message: 'Could not create Project',
              })
            )
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ViewHeaderActions.deleteProject),
      mergeMap((action) =>
        this.projectsService.delete(action.project.id!).pipe(
          map((_) =>
            YataApiActions.deleteProjectSuccess({
              project: action.project,
            })
          ),
          tap(() => this.router.navigateByUrl('/')),
          catchError(() =>
            of(
              YataApiActions.deleteProjectError({
                message: `Could not delete Project`,
              })
            )
          )
        )
      )
    )
  );

  getOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SidenavActions.projectSelected),
      switchMap((action) =>
        this.projectsService.get(action.projectId).pipe(
          map((project) => YataApiActions.loadProjectSuccess({ project })),
          catchError(() =>
            of(
              YataApiActions.loadProjectError({
                message: 'Could not load the selected project',
              })
            )
          )
        )
      )
    )
  );

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SidenavActions.onInit),
      switchMap(() =>
        this.projectsService.getAll().pipe(
          map((res) =>
            YataApiActions.loadProjectsSuccess({ projects: res.data })
          ),
          catchError(() =>
            of(
              YataApiActions.loadProjectsError({
                message: "Could not load the user's projects",
              })
            )
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ViewHeaderActions.updateProject),
      concatMap((action) =>
        this.projectsService.update(action.project).pipe(
          map((project) => {
            this.snackbar.open(`${project.name} was updated.`);
            return YataApiActions.updateProjectSuccess({ project });
          }),
          catchError(() =>
            of(
              YataApiActions.updateProjectError({
                message: 'Could not update the Project',
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
        this.projectsService.update(action.project).pipe(
          map((project) => YataApiActions.updateProjectSuccess({ project })),
          catchError(() =>
            of(
              YataApiActions.updateProjectError({
                message: 'Could not persist the project view',
              })
            )
          )
        )
      )
    )
  );
}
