import { createFeature, createReducer, on } from '@ngrx/store';
import { Task } from '../../models';
import { YataApiActions } from '../actions';

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
  reducer: createReducer(
    initialState,
    on(YataApiActions.loadTasksSuccess, (state, action) => ({
      ...state,
      tasks: action.tasks,
    }))
  ),
});

export const {
  name,
  reducer,
  selectCurrentTaskId,
  selectTasks,
  selectTasksState,
} = tasksFeature;
