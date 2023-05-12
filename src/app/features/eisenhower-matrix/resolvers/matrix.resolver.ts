import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, mergeMap, of } from 'rxjs';
import { TasksService } from '../../../services/http';
import { YataApiActions } from '../../../store/actions';

export function tasksResolver() {
  const store = inject(Store);
  const router = inject(Router);
  const tasksService = inject(TasksService);

  return tasksService.getAll().pipe(
    mergeMap((res) => {
      store.dispatch(
        YataApiActions.loadTasksSuccess({
          tasks: res.data,
        })
      );
      return of(res.data);
    }),
    catchError((error: HttpErrorResponse) => {
      router.navigateByUrl('/app/inbox');
      return of(
        YataApiActions.serverError({
          error,
        })
      );
    })
  );
}
