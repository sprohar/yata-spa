import { PaginatedList } from '../interfaces';
import { Project } from '../models';

export const mockProjects: Project[] = [
  { id: 1, name: 'Inbox', userId: '1', view: Project.View.LIST },
  { id: 2, name: 'Yata API', userId: '1', view: Project.View.LIST },
  { id: 3, name: 'Yata SPA', userId: '1', view: Project.View.LIST },
];

export const mockPaginatedProjectsList: PaginatedList<Project> = {
  count: mockProjects.length,
  pageIndex: 0,
  pageSize: 30,
  data: mockProjects,
};
