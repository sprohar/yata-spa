import { Subtask } from './subtask.model';

export interface Task {
  id?: number;
  title: string;
  content?: string;
  priority?: Task.Priority;
  completed?: boolean;
  deleted?: boolean;
  isAllDay?: boolean;
  dueDate?: string | null;
  completedOn?: string;
  createdAt?: string;
  updatedAt?: string;
  subtasks?: Subtask[];
  projectId: number;
  sectionId?: number;
  taskId?: number;
}

export namespace Task {
  export enum Priority {
    NONE,
    HIGH,
    MEDIUM,
    LOW,
  }

  export enum Title {
    MaxLength = 1024,
  }

  export enum Content {
    MaxLength = 8192,
  }
}
