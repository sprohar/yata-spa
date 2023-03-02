import { createFeature, createReducer, on } from '@ngrx/store';
import { Task } from '../../models';
import { KanbanViewActions, YataApiActions } from '../actions';
import { TaskDetailsActions } from '../actions/task-details.actions';

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
      currentTaskId: state.currentTaskId,
      tasks: action.project.tasks ?? [],
    })),
    on(KanbanViewActions.setCurrentTaskId, (state, action) => ({
      tasks: state.tasks,
      currentTaskId: action.taskId,
    })),
    on(TaskDetailsActions.clearCurrentTaskId, (state, _) => ({
      tasks: state.tasks,
      currentTaskId: null,
    })),
    on(YataApiActions.createSubtaskSuccess, (state, action) => {
      const tasks: Task[] = [];
      for (const task of state.tasks) {
        if (task.id === action.subtask.taskId) {
          tasks.push({
            ...task,
            subtasks: task.subtasks?.concat(action.subtask) ?? [action.subtask],
          });
        } else {
          tasks.push(task);
        }
      }

      return {
        ...state,
        tasks,
      };
    })
  ),
});

export const {
  name,
  reducer,
  selectCurrentTaskId,
  selectTasks,
  selectTasksState,
} = tasksFeature;
