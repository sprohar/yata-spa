import { Subtask } from './subtask.model';
import { Tag } from './tag.model';

export interface Task {
  id?: number;
  title: string;
  content?: string;
  priority?: Priority;
  completed?: boolean;
  deleted?: boolean;
  isAllDay?: boolean;
  dueDate?: string | null;
  completedOn?: string;

  // recurrence
  startDate?: Date;
  endDate?: Date;
  rrule?: string;
  rruleSet?: string;

  // timestamps
  createdAt?: string;
  updatedAt?: string;

  // relations
  subtasks?: Subtask[];
  tags?: Tag[];
  projectId: number;
  sectionId?: number | null;
}

export enum Priority {
  NONE = 0,
  LOW = 10,
  MEDIUM = 100,
  HIGH = 1000,
}

export namespace Task {
  export enum Title {
    MaxLength = 1024,
  }

  export enum Content {
    MaxLength = 8192,
  }
}
