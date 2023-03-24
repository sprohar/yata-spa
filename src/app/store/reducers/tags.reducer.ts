import { createFeature, createReducer, on } from '@ngrx/store';
import { Tag } from '../../models';
import { SidenavActions, YataApiActions } from '../actions';

export interface TagsState {
  tags: Tag[];
  currentTagId: number | null;
}

export const initialTagsState: TagsState = {
  tags: [],
  currentTagId: null,
};

function updateTag(tags: Tag[], updatedTag: Tag) {
  const collection: Tag[] = [];
  for (const tag of tags) {
    if (tag.id === updatedTag.id) {
      collection.push(updatedTag);
    } else {
      collection.push(tag);
    }
  }
  return collection;
}

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
    })),
    on(SidenavActions.selectTag, (state, action) => ({
      tags: state.tags,
      currentTagId: action.tagId,
    })),
    on(YataApiActions.updateTagSuccess, (state, action) => ({
      currentTagId: state.currentTagId,
      tags: updateTag(state.tags, action.tag),
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
