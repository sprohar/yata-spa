import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { StorageKeys } from '../../storage/storage.keys';
import { StorageActions, TasksOrderByOptionsActions } from '../actions';

@Injectable()
export class StorageEffects {
  constructor(
    private actions$: Actions,
    private storage: LocalStorageService
  ) {}

  setItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksOrderByOptionsActions.setOrderBy),
      exhaustMap((action) => {
        this.storage.set(StorageKeys.ORDER_BY, action.orderBy);
        return of(
          StorageActions.setItemSuccess({
            orderBy: action.orderBy,
          })
        );
      })
    )
  );
}
