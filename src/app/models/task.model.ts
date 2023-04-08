import { Tag } from './tag.model';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  content?: string;
  priority?: Priority;
  isCompleted?: boolean;
  isAllDay?: boolean;
  sortOrder?: number;
  dueDate?: string | null;

  // recurrence
  startDate?: Date;
  endDate?: Date;
  rrule?: string;
  rruleSet?: string;

  // timestamps
  completedAt?: string;
  createdAt?: string;
  updatedAt?: string;

  // relations
  parentId?: number;
  subtasks?: Task[];
  tags?: Tag[];
  projectId: number;
  userId?: number;
  sectionId?: number | null;
}

export enum Priority {
  NONE = 0,
  LOW = 10,
  MEDIUM = 100,
  HIGH = 1000,
}

export namespace Task {
  export enum OrderBy {
    DUE_DATE = 'dueDate',
    PRIORITY = 'priority',
    SECTION = 'section',
  }

  export enum Title {
    MaxLength = 4096,
  }

  export enum Description {
    MaxLength = 8192,
  }

  export enum Content {
    MaxLength = 8192,
  }
}
