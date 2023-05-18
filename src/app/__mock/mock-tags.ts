import { PaginatedList } from '../interfaces';
import { Tag } from '../models';

export const mockTags: Tag[] = [
  { id: 1, name: 'C++', colorHexCode: '#2259e3', userId: '1' },
  { id: 2, name: 'Python', colorHexCode: '#ffff00', userId: '1' },
  { id: 3, name: 'Java', colorHexCode: '#ff0000', userId: '1' },
  { id: 4, name: 'PHP', colorHexCode: '#b0b3d6', userId: '1' },
  { id: 5, name: 'C', colorHexCode: '#2259e3', userId: '1' },
];

export const mockPaginatedTagsList: PaginatedList<Tag> = {
  count: mockTags.length,
  pageIndex: 0,
  pageSize: 30,
  data: mockTags,
};
