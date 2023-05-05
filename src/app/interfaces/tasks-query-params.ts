import { Priority } from '../models';
import { SortOrder } from '../strategies/sort';

export interface TasksQueryParams {
  query?: string;
  dir?: SortOrder;
  skip?: number;
  take?: number;
  priority?: Priority;
  projectId?: number;
  title?: string;
  startDate?: string;
  endDate?: string;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
}
