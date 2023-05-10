import { PaginatedList } from '../interfaces';
import { Section } from '../models';

export const mockSections: Section[] = [
  { id: 1, name: 'To-Do', projectId: 1 },
  { id: 2, name: 'In Progress', projectId: 1 },
  { id: 3, name: 'Testing', projectId: 1 },
];

export const mockPaginatedSectionsList: PaginatedList<Section> = {
  count: mockSections.length,
  pageIndex: 0,
  pageSize: 30,
  data: mockSections,
};
