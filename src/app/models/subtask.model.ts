import { Task } from './task.model';

export interface Subtask {
  id?: number;
  title: string;
  priority?: Task.Priority;
  completed?: boolean;
  deleted?: boolean;
  completedOn?: string;
  createdOn?: string;
  updatedOn?: string;
  taskId: number;
}
