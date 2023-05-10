import { PaginatedList } from '../interfaces';
import { Tag } from '../models';

export const mockTags: Tag[] = [{ id: 1, name: 'Fruit', userId: '1' }];

export const mockPaginatedTagsList: PaginatedList<Tag> = {
  count: mockTags.length,
  pageIndex: 0,
  pageSize: 30,
  data: mockTags,
};
