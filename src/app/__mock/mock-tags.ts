import { PaginatedList } from '../interfaces';
import { Tag } from '../models';

export const mockTags: Tag[] = [
  { id: 1, name: 'C++', colorHexCode: '#c8d533', userId: '1' },
  { id: 2, name: 'Python', colorHexCode: '#d6babd', userId: '1' },
  { id: 3, name: 'Java', colorHexCode: '#cd1b0b', userId: '1' },
  { id: 4, name: 'Python', colorHexCode: '#c7eecc', userId: '1' },
  { id: 5, name: 'C', colorHexCode: '#fa6495', userId: '1' },
];

export const mockPaginatedTagsList: PaginatedList<Tag> = {
  count: mockTags.length,
  pageIndex: 0,
  pageSize: 30,
  data: mockTags,
};
