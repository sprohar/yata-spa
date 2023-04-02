import { Task } from '../models';

export interface GroupedTasks {
  [key: string]: Task[];
}
