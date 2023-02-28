import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { SectionsService } from '../../services/sections.service';
import { KanbanViewActions, YataApiActions } from '../actions';

@Injectable()
export class SectionsEffects {
  constructor(
    private actions$: Actions,
    private sectionsService: SectionsService
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KanbanViewActions.createSection),
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
}
