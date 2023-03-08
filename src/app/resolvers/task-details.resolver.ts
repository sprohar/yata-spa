import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { Task } from '../models';
import { TasksService } from '../services/tasks.service';
import { TaskResolverActions, YataApiActions } from '../store/actions';

export const taskResolver: ResolveFn<Task> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const projectId = parseInt(route.paramMap.get('projectId')!);
  const taskId = parseInt(route.paramMap.get('taskId')!);

  if (taskId) {
    store.dispatch(TaskResolverActions.setCurrentTaskId({ taskId }));
  }

  return inject(TasksService)
    .get(projectId, taskId)
    .pipe(
      tap((task) => {
        if (task) {
          store.dispatch(YataApiActions.loadTaskSuccess({ task }));
        }
      })
    );
};
