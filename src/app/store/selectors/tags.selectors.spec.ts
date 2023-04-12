import { TagsState } from '../reducers/tags.reducer';
import { selectCurrentTag } from './tags.selectors';

const tagsState: TagsState = {
  currentTagId: null,
  tags: [
    {
      id: 1,
      name: 'Tag 1',
    },
    {
      id: 2,
      name: 'Tag 2',
    },
  ],
};

describe('Tags Selectors', () => {
  it('should select the current tag', () => {
    expect(
      selectCurrentTag.projector(tagsState.tags[0].id!, tagsState.tags)
    ).toEqual({
      id: 1,
      name: 'Tag 1',
    });
  });

  it('should return null if currentTagId is null', () => {
    expect(selectCurrentTag.projector(null, tagsState.tags)).toBeNull();
  });

  it('should return null when given a tag id that does not exist', () => {
    expect(selectCurrentTag.projector(3, tagsState.tags)).toBeNull();
  });
});
