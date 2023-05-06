import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map } from 'rxjs';
import { PaginatedList } from '../interfaces';
import { Tag } from '../models';
import { TagsService } from '../services/http';
import { YataApiActions } from '../store/actions';

export function tagsResolver() {
  const router = inject(Router);
  const store = inject(Store);

  return inject(TagsService)
    .getAll()
    .pipe(
      map((res: PaginatedList<Tag>) => {
        store.dispatch(
          YataApiActions.loadTagsSuccess({
            tags: res.data,
          })
        );
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        store.dispatch(
          YataApiActions.serverError({
            error,
          })
        );
        router.navigateByUrl('/app');
        return EMPTY;
      })
    );
}
