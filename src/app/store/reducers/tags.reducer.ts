import { createFeature, createReducer, on } from '@ngrx/store';
import { Tag } from '../../models';
import { SidenavActions, YataApiActions } from '../actions';

export interface TagsState {
  currentTagId: number | null;
  tags: Tag[];
}

export const initialTagsState: TagsState = {
  currentTagId: null,
  tags: [],
};

export const tagsFeature = createFeature({
  name: 'tags',
  reducer: createReducer(
    initialTagsState,
    on(YataApiActions.createTaskSuccess, (state, action) => ({
      currentTagId: state.currentTagId,
      tags: state.tags
        .concat(action.task.tags ?? [])
        .sort((a, b) => a.name.localeCompare(b.name)),
    })),
    on(YataApiActions.createTagSuccess, (state, action) => ({
      currentTagId: state.currentTagId,
      tags: state.tags.concat(action.tag),
    })),
    on(YataApiActions.loadTagsSuccess, (state, action) => ({
      currentTagId: state.currentTagId,
      tags: action.tags,
    })),
    on(SidenavActions.selectTag, (state, action) => ({
      tags: state.tags,
      currentTagId: action.tagId,
    })),
    on(YataApiActions.updateTagSuccess, (state, action) => ({
      ...state,
      tags: state.tags.map((tag) =>
        tag.id === action.tag.id ? action.tag : tag
      ),
    })),
    on(YataApiActions.deleteTagSuccess, (state, action) => ({
      currentTagId: state.currentTagId,
      tags: state.tags.filter((tag) => tag.id !== action.tag.id),
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
