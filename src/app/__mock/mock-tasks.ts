import { PaginatedList } from '../interfaces';
import { Priority, Task } from '../models';
import { mockTags } from './mock-tags';

const today = new Date(new Date().setHours(0, 0, 0));

export const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Bandage - Flexible Neon',
    description:
      'Donec vitae nisi.',
    projectId: 1,
    userId: '1',
    dueDate: today.toISOString(),
    priority: Priority.HIGH,
    isCompleted: false,
    isAllDay: true,
  },
  {
    id: 2,
    title: 'Cheese - Parmesan Grated',
    description:
      'Sed sagittis.',
    projectId: 1,
    userId: '1',
    dueDate: today.toISOString(),
    priority: Priority.HIGH,
    isCompleted: false,
    isAllDay: true,
  },
  {
    id: 3,
    title: 'Toothpick Frilled',
    description:
      'Nullam varius.',
    projectId: 1,
    userId: '1',
    dueDate: today.toISOString(),
    priority: Priority.MEDIUM,
    isCompleted: false,
    isAllDay: true,
  },
  {
    id: 4,
    title: 'Beef - Top Butt',
    description:
      'Suspendisse potenti.',
    projectId: 1,
    userId: '1',
    dueDate: today.toISOString(),
    priority: Priority.MEDIUM,
    isCompleted: false,
    isAllDay: true,
  },
  {
    id: 5,
    title: 'Yeast - Fresh, Fleischman',
    description: 'Proin interdum mauris non ligula pellentesque ultrices.',
    projectId: 1,
    userId: '1',
    dueDate: today.toISOString(),
    priority: Priority.LOW,
    isCompleted: false,
    isAllDay: true,
  },
  {
    id: 6,
    title: 'Beer - Mcauslan Apricot',
    description:
      'In blandit ultrices enim.',
    projectId: 1,
    userId: '1',
    dueDate: today.toISOString(),
    priority: Priority.LOW,
    isCompleted: false,
    isAllDay: true,
  },
  {
    id: 7,
    title: 'Chicken - Whole Fryers',
    description:
      'Nulla mollis molestie lorem.',
    projectId: 1,
    userId: '1',
    dueDate: today.toISOString(),
    priority: Priority.NONE,
    isCompleted: false,
    isAllDay: true,
  },
  {
    id: 8,
    title: 'Wine - Prem Select Charddonany',
    description:
      'Phasellus sit amet erat.',
    projectId: 1,
    userId: '1',
    dueDate: today.toISOString(),
    priority: Priority.NONE,
    isCompleted: false,
    isAllDay: true,
  },
  {
    id: 9,
    title: 'Coconut - Creamed, Pure',
    description:
      'Nam nulla.',
    projectId: 1,
    userId: '1',
    priority: Priority.NONE,
    isCompleted: false,
    isAllDay: true,
  },
  {
    id: 10,
    title: 'Grapes - Red',
    description:
      'Vivamus vestibulum sagittis sapien.',
    projectId: 1,
    userId: '1',
    priority: Priority.NONE,
    isCompleted: false,
    isAllDay: true,
    tags: [mockTags.at(0)!],
  },
];

export const mockPaginatedTasksList: PaginatedList<Task> = {
  pageIndex: 0,
  pageSize: 30,
  count: mockTasks.length,
  data: mockTasks,
};
