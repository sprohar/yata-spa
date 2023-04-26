import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, tap } from 'rxjs';
import { ApiErrorResponse } from '../../error/api-error-response';
import { SectionsService } from '../../services/sections.service';
import {
  EditSectionDialogActions,
  KanbanViewActions,
  SectionOptionsActions,
  ViewHeaderActions,
  YataApiActions,
} from '../actions';

@Injectable()
export class SectionsEffects {
  constructor(
    private actions$: Actions,
    private sectionsService: SectionsService,
    private snackbar: MatSnackBar
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KanbanViewActions.createSection, ViewHeaderActions.createSection),
      concatMap((action) =>
        this.sectionsService.create(action.section).pipe(
          map((section) => YataApiActions.createSectionSuccess({ section })),
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
      ofType(SectionOptionsActions.deleteSection),
      mergeMap((action) =>
        this.sectionsService.delete(action.section).pipe(
          map(() =>
            YataApiActions.deleteSectionSuccess({ section: action.section })
          ),
          tap(() => this.snackbar.open(`${action.section.name} was deleted`)),
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

  moveToProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectionOptionsActions.moveToProject),
      concatMap((action) =>
        this.sectionsService
          .update({
            id: action.section.id,
            projectId: action.targetProjectId,
          })
          .pipe(
            map((section) =>
              YataApiActions.moveSectionToProjectSuccess({ section })
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
      ofType(EditSectionDialogActions.updateSection),
      concatMap((action) =>
        this.sectionsService.update(action.section).pipe(
          map((section) => YataApiActions.updateSectionSuccess({ section })),
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
