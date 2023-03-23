import { createFeature, createReducer, on } from '@ngrx/store';
import { Tag } from '../../models';
import { YataApiActions } from '../actions';

export interface TagsState {
  tags: Tag[];
  currentTagId: number | null;
}

export const initialTagsState: TagsState = {
  tags: [],
  currentTagId: null,
};

export const tagsFeature = createFeature({
  name: 'tags',
  reducer: createReducer(
    initialTagsState,
    on(YataApiActions.createTagSuccess, (state, action) => ({
      currentTagId: state.currentTagId,
      tags: state.tags.concat(action.tag),
    })),
    on(YataApiActions.loadTagsSuccess, (state, action) => ({
      currentTagId: state.currentTagId,
      tags: action.tags,
    }))
  ),
});

export const {
  name,
  reducer,
  selectTags,
  selectTagsState,
  selectCurrentTagId,
} = tagsFeature;
