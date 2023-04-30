import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { TagsService } from '../../services/http';
import { SidenavActions, TaskDetailsActions, YataApiActions } from '../actions';

@Injectable()
export class TagsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly tagsService: TagsService,
    private readonly snackbar: MatSnackBar
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SidenavActions.createTag, TaskDetailsActions.createTag),
      concatMap((action) =>
        this.tagsService.create(action.tag).pipe(
          map((tag) => YataApiActions.createTagSuccess({ tag })),
          catchError((error: HttpErrorResponse) =>
            of(YataApiActions.serverError({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SidenavActions.deleteTag),
      switchMap((action) =>
        this.tagsService.delete(action.tag).pipe(
          map((_res) => {
            this.snackbar.open(`${action.tag.name} was deleted`);
            return YataApiActions.deleteTagSuccess({
              tag: action.tag,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            this.snackbar.open('Error. Please try again.');
            return of(
              YataApiActions.serverError({
                error,
              })
            );
          })
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SidenavActions.editTag),
      concatMap((action) =>
        this.tagsService.update(action.tag).pipe(
          map((tag) => {
            this.snackbar.open(`${tag.name} was updated!`);
            return YataApiActions.updateTagSuccess({ tag });
          }),
          catchError((error: HttpErrorResponse) =>
            of(YataApiActions.serverError({ error }))
          )
        )
      )
    )
  );
}
