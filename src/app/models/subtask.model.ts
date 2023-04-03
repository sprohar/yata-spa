import { Priority } from './task.model';

export interface Subtask {
  id?: number;
  title: string;
  priority?: Priority;
  completed?: boolean;
  deleted?: boolean;
  dueDate?: string;
  completedOn?: string;
  createdOn?: string;
  updatedOn?: string;
  taskId: number;
}
