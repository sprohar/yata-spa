import { PaginatedList } from '../interfaces';
import { Project } from '../models';

export const mockProjects: Project[] = [
  { id: 1, name: 'Shopping List', userId: '1', view: Project.View.LIST },
  { id: 2, name: 'Inbox', userId: '1' },
];

export const mockPaginatedProjectsList: PaginatedList<Project> = {
  count: mockProjects.length,
  pageIndex: 0,
  pageSize: 30,
  data: mockProjects,
};
