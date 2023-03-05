import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, tap } from 'rxjs';
import { Section } from '../../models';
import { SectionsService } from '../../services/sections.service';
import {
  EditSectionDialogActions,
  KanbanViewActions,
  SectionOptionsMenuActions,
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
          catchError(() =>
            of(
              YataApiActions.createSectionError({
                message: 'Could not create Section',
              })
            )
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectionOptionsMenuActions.deleteSection),
      mergeMap((action) =>
        this.sectionsService.delete(action.section).pipe(
          map(() =>
            YataApiActions.deleteSectionSuccess({ section: action.section })
          ),
          tap(() => this.snackbar.open(`${action.section.name} was deleted`)),
          catchError(() =>
            of(
              YataApiActions.deleteSectionError({
                message: 'Could not delete Section',
              })
            )
          )
        )
      )
    )
  );

  moveToProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectionOptionsMenuActions.moveToProject),
      concatMap((action) =>
        this.sectionsService
          .update({
            id: action.section.id,
            projectId: action.targetProjectId,
          })
          .pipe(
            map(
              (section) =>
                YataApiActions.moveSectionToProjectSuccess({ section }),
              catchError(() =>
                of(
                  YataApiActions.moveSectionToProjectError({
                    message: 'Could not update Section',
                  })
                )
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
          map(
            (section) => YataApiActions.updateSectionSuccess({ section }),
            catchError(() =>
              of(
                YataApiActions.updateSectionError({
                  message: 'Could not update Section',
                })
              )
            )
          )
        )
      )
    )
  );
}
