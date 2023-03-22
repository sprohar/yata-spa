import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { ChronoService } from '../../services/chrono.service';
import { YataApiActions } from '../../store/actions';

export function todaysTasksGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  const store = inject(Store);
  const chronoService = inject(ChronoService);
  return chronoService.getTodaysTasks().pipe(
    map((res) => {
      store.dispatch(YataApiActions.loadTasksSuccess({ tasks: res.data }));
      return true;
    }),
    catchError((error) => {
      of(YataApiActions.loadTasksError({ error }));
      return of(false);
    })
  );
}
