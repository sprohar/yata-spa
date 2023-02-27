import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { SidenavActions } from '../store/actions';
import { selectTasks } from '../store/reducers/tasks.reducer';

@Injectable({
  providedIn: 'root',
})
export class ProjectTasksGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    const projectId = parseInt(route.paramMap.get('projectId')!);

    return this.store.select(selectTasks).pipe(
      tap((tasks) => {
        if (tasks.length === 0) {
          this.store.dispatch(
            SidenavActions.projectSelected({
              projectId,
            })
          );
        }
      }),
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
