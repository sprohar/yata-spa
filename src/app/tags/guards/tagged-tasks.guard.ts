import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { ApiErrorResponse } from '../../interfaces/api-error-response';
import { SidenavActions, YataApiActions } from '../../store/actions';
import { TagsService } from '../../services/tags.service';

export function taggedTasksGuard(
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) {
  const param: string | null = route.paramMap.get('tagId');
  if (param === null) return false;

  const tagId = parseInt(param);
  const store = inject(Store);

  return inject(TagsService)
    .getTasks(tagId)
    .pipe(
      map((res) => {
        store.dispatch(
          SidenavActions.selectTag({
            tagId,
          })
        );

        store.dispatch(
          YataApiActions.loadTasksSuccess({
            tasks: res.data,
          })
        );

        return true;
      }),
      catchError((error: ApiErrorResponse) => {
        store.dispatch(YataApiActions.loadTasksError({ error }));
        return of(false);
      })
    );
}
