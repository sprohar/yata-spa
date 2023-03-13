import { createFeature, createReducer, on } from '@ngrx/store';
import { TaskCreatedAtSortStrategy } from 'src/app/strategies/tasks/task-created-at-sort.strategy';
import { TaskListSortContext } from 'src/app/strategies/tasks/task-list-sort-context';
import { Subtask, Task } from '../../models';
import {
  EisenhowerMatrixActions,
  TaskCardActions,
  TaskResolverActions,
  YataApiActions,
} from '../actions';
import { TaskDetailsActions } from '../actions/task-details.actions';
import { TaskListSortOptionsActions } from '../actions/task-list-sort-options.actions';
import { TaskOptionsMenuActions } from '../actions/task-options-menu.actions';

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
    on(YataApiActions.loadTasksSuccess, (state, action) => ({
      ...state,
      tasks: action.tasks,
    })),
    on(TaskListSortOptionsActions.sortByCreatedAt, (state, _) => ({
      ...state,
      tasks: new TaskListSortContext(new TaskCreatedAtSortStrategy()).sort(
        state.tasks
      ),
    })),
    on(
      TaskOptionsMenuActions.viewTaskDetails,
      TaskCardActions.viewTaskDetails,
      EisenhowerMatrixActions.viewTaskDetails,
      (state, action) => ({
        tasks: state.tasks,
        currentTaskId: action.taskId,
      })
    ),
    on(YataApiActions.deleteTaskSuccess, (state, action) => ({
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.task.id),
    })),
    on(YataApiActions.moveSectionToProjectSuccess, (state, action) => {
      return {
        ...state,
        currentTaskId: state.currentTaskId,
        tasks: state.tasks.map(
          (task) => ({ ...task, projectId: action.section.projectId } as Task)
        ),
      };
    }),
    on(YataApiActions.createTaskSuccess, (state, action) => ({
      currentTaskId: state.currentTaskId,
      tasks: state.tasks.concat(action.task),
    })),
    on(YataApiActions.loadProjectSuccess, (state, action) => ({
      currentTaskId: state.currentTaskId,
      tasks: action.project.tasks ?? [],
    })),
    on(YataApiActions.updateTaskSuccess, (state, action) => {
      const tasks: Task[] = [];
      for (const task of state.tasks) {
        if (task.id === action.task.id) {
          tasks.push(action.task);
        } else {
          tasks.push(task);
        }
      }

      return {
        currentTaskId: state.currentTaskId,
        tasks,
      };
    }),
    on(YataApiActions.loadTaskSuccess, (state, action) => {
      const tasks: Task[] = [];
      for (const task of state.tasks) {
        if (task.id === action.task.id) {
          tasks.push(action.task);
        } else {
          tasks.push(task);
        }
      }

      return {
        currentTaskId: state.currentTaskId,
        tasks,
      };
    }),
    on(TaskResolverActions.setCurrentTaskId, (state, action) => ({
      tasks: state.tasks,
      currentTaskId: action.taskId,
    })),
    on(TaskDetailsActions.resetCurrentTaskId, (state, _) => ({
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
    }),
    on(YataApiActions.deleteSubtaskSuccess, (state, action) => {
      const tasks: Task[] = [];
      for (const task of state.tasks) {
        if (task.id === action.subtask.taskId) {
          tasks.push({
            ...task,
            subtasks: task.subtasks?.filter((s) => s.id !== action.subtask.id),
          });
        } else {
          tasks.push(task);
        }
      }

      return {
        currentTaskId: state.currentTaskId,
        tasks,
      };
    }),
    on(YataApiActions.updateSubtaskSuccess, (state, action) => {
      const tasks: Task[] = [];
      for (const task of state.tasks) {
        if (task.id === action.subtask.taskId) {
          const subtasks: Subtask[] = [];

          for (const subtask of task.subtasks!) {
            if (subtask.id === action.subtask.id) {
              subtasks.push(action.subtask);
            } else {
              subtasks.push(subtask);
            }
          }

          tasks.push({
            ...task,
            subtasks,
          });
        } else {
          tasks.push(task);
        }
      }

      return {
        currentTaskId: state.currentTaskId,
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
