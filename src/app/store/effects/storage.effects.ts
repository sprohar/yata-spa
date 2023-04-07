import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { StorageKeys } from '../../storage/storage.keys';
import { StorageActions, TasksOrderByOptionsActions } from '../actions';

@Injectable()
export class StorageEffects {
  constructor(
    private actions$: Actions,
    private storage: LocalStorageService
  ) {}

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksOrderByOptionsActions.clearOrderBy),
      switchMap(() => {
        this.storage.remove(StorageKeys.ORDER_BY);
        return of(
          StorageActions.removeItemSuccess({
            orderBy: StorageKeys.ORDER_BY,
          })
        );
      })
    )
  );

  setItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksOrderByOptionsActions.setOrderBy),
      switchMap((action) => {
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
