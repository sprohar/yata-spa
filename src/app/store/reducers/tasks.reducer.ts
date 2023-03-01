import { createFeature, createReducer, on } from '@ngrx/store';
import { Task } from '../../models';
import { KanbanViewActions, YataApiActions } from '../actions';

export interface TasksState {
  tasks: Task[];
  currentTaskId: number | null;
}

export const initialTasksState: TasksState = {
  tasks: [],
  currentTaskId: null,
};

export const tasksFeature = createFeature({
  name: 'tasks',
  reducer: createReducer(
    initialTasksState,
    on(YataApiActions.createTaskSuccess, (state, action) => ({
      currentTaskId: state.currentTaskId,
      tasks: state.tasks.concat(action.task),
    })),
    on(YataApiActions.loadProjectSuccess, (state, action) => ({
      ...state,
      tasks: action.project.tasks ?? [],
    })),
    on(KanbanViewActions.setCurrentTaskId, (state, action) => ({
      tasks: state.tasks,
      currentTaskId: action.taskId,
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
