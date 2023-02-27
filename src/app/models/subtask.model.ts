import { Priority } from "../enums/priority.enum";

export interface Subtask {
  id?: number;
  title: string;
  priority?: Priority;
  completed?: boolean;
  deleted?: boolean;
  completedOn?: string;
  createdOn?: string;
  updatedOn?: string;
  taskId: number;
}
