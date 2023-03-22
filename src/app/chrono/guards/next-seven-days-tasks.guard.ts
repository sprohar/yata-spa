import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { ChronoService } from '../../services/chrono.service';
import { YataApiActions } from '../../store/actions';

export function nextSevenDaysTasksGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  const store = inject(Store);
  const chronoService = inject(ChronoService);
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const from = today.getTime();
  const to = nextWeek.getTime();

  //   TODO: Try it out
  return chronoService
    .getTasks({
      from: `${from}`,
      to: `${to}`,
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
