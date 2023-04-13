import { inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, tap } from 'rxjs';
import { ApiErrorResponse } from '../error';
import { Task } from '../models';
import { TasksService } from '../services/tasks.service';
import { YataApiActions } from '../store/actions';

export const taskDetailsResolver: ResolveFn<Task> = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const router = inject(Router);
  const thisRoute = inject(ActivatedRoute);
  const taskId = parseInt(route.paramMap.get('taskId')!);

  return inject(TasksService)
    .get(taskId)
    .pipe(
      tap((task) => store.dispatch(YataApiActions.loadTaskSuccess({ task }))),
      catchError((error: ApiErrorResponse) => {
        console.error(error);
        store.dispatch(YataApiActions.loadTaskError({ error }));
        router.navigate(['../..'], { relativeTo: thisRoute });
        return EMPTY;
      })
    );
};
