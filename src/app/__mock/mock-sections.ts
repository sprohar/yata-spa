import { PaginatedList } from '../interfaces';
import { Section } from '../models';

export const mockSections: Section[] = [
  { id: 1, name: 'To-Do', projectId: 1 },
  { id: 2, name: 'In Progress', projectId: 1 },
  { id: 3, name: 'Testing', projectId: 1 },
  { id: 4, name: 'To-Do', projectId: 2 },
  { id: 5, name: 'In Progress', projectId: 2 },
  { id: 6, name: 'Testing', projectId: 2 },
  { id: 7, name: 'To-Do', projectId: 3 },
  { id: 8, name: 'In Progress', projectId: 3 },
  { id: 9, name: 'Testing', projectId: 3 },
];

export const mockPaginatedSectionsList: PaginatedList<Section> = {
  count: mockSections.length,
  pageIndex: 0,
  pageSize: 30,
  data: mockSections,
};
