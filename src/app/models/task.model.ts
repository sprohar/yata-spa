import { Project } from './project.model';
import { Section } from './section.model';
import { Tag } from './tag.model';

export interface Task {
  id?: number;
  title: string;
  description?: string | null;
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
  project?: Project;
  userId?: string;
  sectionId?: number | null;
  section?: Section;
}

export enum Priority {
  ALL = -1,
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
