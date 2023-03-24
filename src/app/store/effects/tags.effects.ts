import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { ApiErrorResponse } from '../../interfaces/api-error-response';
import { TagsService } from '../../services/tags.service';
import { SidenavActions, YataApiActions } from '../actions';

@Injectable()
export class TagsEffects {
  constructor(
    private actions$: Actions,
    private tagsService: TagsService,
    private snackbar: MatSnackBar
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SidenavActions.createTag),
      concatMap((action) =>
        this.tagsService.create(action.tag).pipe(
          map((tag) => YataApiActions.createTagSuccess({ tag })),
          catchError((error: ApiErrorResponse) =>
            of(YataApiActions.createTagError({ error }))
          )
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
          catchError((error: ApiErrorResponse) =>
            of(YataApiActions.updateTagError({ error }))
          )
        )
      )
    )
  );
}
