import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { ChronoService } from '../../services/chrono.service';
import { YataApiActions } from '../../store/actions';

export function nextSevenDaysTasksGuard(
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) {
  const store = inject(Store);
  const chronoService = inject(ChronoService);

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setHours(23, 59, 59, 999);
  endDate.setDate(startDate.getDate() + 7);

  return chronoService
    .getTasks({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    })
    .pipe(
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
