import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, tap } from 'rxjs';
import { ApiErrorResponse } from '../../error';
import { PaginatedList } from '../../interfaces';
import { Task } from '../../models';
import { ChronoService } from '../../services';
import { YataApiActions } from '../../store/actions';

export const todaysTasksResolver: ResolveFn<PaginatedList<Task>> = () => {
  const service = inject(ChronoService);
  const router = inject(Router);
  const store = inject(Store);

  return service.getTodaysTasks().pipe(
    tap((res: PaginatedList<Task>) => {
      store.dispatch(YataApiActions.loadTasksSuccess({ tasks: res.data }));
    }),
    catchError((error: ApiErrorResponse) => {
      store.dispatch(YataApiActions.loadTasksError({ error }));
      router.navigate(['/error']);
      return EMPTY;
    })
  );
};
