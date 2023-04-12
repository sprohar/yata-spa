import { createSelector } from '@ngrx/store';
import { selectCurrentTagId, selectTags } from '../reducers/tags.reducer';

export const selectCurrentTag = createSelector(
  selectCurrentTagId,
  selectTags,
  (currentTagId, tags) => tags.find((tag) => tag.id === currentTagId) ?? null
);
