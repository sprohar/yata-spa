import { Tag } from '../../models';
import { SidenavActions, YataApiActions } from '../actions';
import * as fromTags from './tags.reducer';

describe('TagsReducer', () => {
  describe('YataApiActions.createTaskSuccess', () => {
    it('should add the new tag to the tags array', () => {
      const { initialTagsState } = fromTags;
      const action = YataApiActions.createTaskSuccess({
        task: {
          id: 1,
          projectId: 1,
          sectionId: 1,
          title: 'Task 1',
          description: '',
          tags: [{ id: 1, name: 'Tag 1' }],
        },
      });

      const state = fromTags.reducer(initialTagsState, action);
      expect(state.tags.length).toEqual(1);
    });
  });

  describe('YataApiActions.createTagSuccess', () => {
    it('should add the new tag to the tags array', () => {
      const { initialTagsState } = fromTags;
      const action = YataApiActions.createTagSuccess({
        tag: { id: 1, name: 'Tag 1' },
      });

      const state = fromTags.reducer(initialTagsState, action);
      expect(state.tags.length).toEqual(1);
    });
  });

  describe('YataApiActions.loadTagsSuccess', () => {
    it('should set the tags array to the tags from the project', () => {
      const { initialTagsState } = fromTags;
      const action = YataApiActions.loadTagsSuccess({
        tags: [{ id: 1, name: 'Tag 1' }],
      });

      const state = fromTags.reducer(initialTagsState, action);
      expect(state.tags.length).toEqual(1);
    });
  });

  describe('SidenavActions.selectTag', () => {
    it('should set the selectedTagId to the tagId passed in', () => {
      const { initialTagsState } = fromTags;
      const action = SidenavActions.selectTag({ tagId: 1 });

      const state = fromTags.reducer(initialTagsState, action);
      expect(state.currentTagId).toEqual(1);
    });
  });

  describe('YataApiActions.updateTagSuccess', () => {
    it('should update the tag in the tags array', () => {
      const initialState: fromTags.TagsState = {
        currentTagId: 1,
        tags: [{ id: 1, name: 'Tag 1' }],
      };

      const updatedTag: Tag = { id: 1, name: 'Updated Tag' };
      const action = YataApiActions.updateTagSuccess({
        tag: updatedTag,
      });

      const state = fromTags.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        tags: [updatedTag],
      });
    });
  });

  describe('YataApiActions.deleteTagSuccess', () => {
    it('should update the tag in the tags array', () => {
      const initialState: fromTags.TagsState = {
        currentTagId: 1,
        tags: [{ id: 1, name: 'Tag 1' }],
      };

      const updatedTag: Tag = { id: 1, name: 'Updated Tag' };
      const action = YataApiActions.deleteTagSuccess({
        tag: updatedTag,
      });

      const state = fromTags.reducer(initialState, action);
      expect(state.tags.length).toEqual(0);
    });
  });
});
