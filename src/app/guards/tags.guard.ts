import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { ApiErrorResponse } from '../error/api-error-response';
import { TagsService } from '../services/http';
import { YataApiActions } from '../store/actions';

export function tagsGuard(
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) {
  const store = inject(Store);
  return inject(TagsService)
    .getAll()
    .pipe(
      map((res) => {
        store.dispatch(
          YataApiActions.loadTagsSuccess({
            tags: res.data,
          })
        );
        return true;
      }),
      catchError((error: ApiErrorResponse) => {
        store.dispatch(
          YataApiActions.loadTagsError({
            error,
          })
        );
        return of(false);
      })
    );
}
