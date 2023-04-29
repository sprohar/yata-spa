import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ChronoService } from '../../services/http';
import { ChronoActions, YataApiActions } from '../actions';

@Injectable()
export class ChronoEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly chronoService: ChronoService
  ) {}

  today$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChronoActions.getTodaysTasks),
      switchMap(() =>
        this.chronoService.getTodaysTasks().pipe(
          map((res) => YataApiActions.loadTasksSuccess({ tasks: res.data })),
          catchError((error) => of(YataApiActions.serverError({ error })))
        )
      )
    )
  );
}
