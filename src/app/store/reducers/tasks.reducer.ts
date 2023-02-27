import { createFeature, createReducer } from '@ngrx/store';
import { Task } from '../../models';

interface State {
  tasks: Task[];
  currentTaskId: number | null;
}

const initialState: State = {
  tasks: [],
  currentTaskId: null,
};

export const tasksFeature = createFeature({
  name: 'tasks',
  reducer: createReducer(initialState),
});

export const {
  name,
  reducer,
  selectCurrentTaskId,
  selectTasks,
  selectTasksState,
} = tasksFeature;
