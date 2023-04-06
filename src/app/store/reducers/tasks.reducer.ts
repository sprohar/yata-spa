import { createFeature, createReducer, on } from '@ngrx/store';
import { Subtask, Task } from '../../models';
import {
  TaskDueDateSortStrategy,
  TaskListSortContext,
  TaskPrioritySortStrategy,
} from '../../strategies';
import {
  EisenhowerMatrixActions,
  TaskCardActions,
  TaskDetailsActions,
  TaskOptionsMenuActions,
  TaskResolverActions,
  TasksOrderByOptions,
  YataApiActions,
} from '../actions';

export interface TasksState {
  tasks: Task[];
  currentTaskId: number | null;
  orderBy: Task.OrderBy | null;
}

export const initialTasksState: TasksState = {
  tasks: [],
  currentTaskId: null,
  orderBy: null,
};

export const tasksFeature = createFeature({
  name: 'tasks',
  reducer: createReducer(
    initialTasksState,
    on(YataApiActions.loadTasksSuccess, (state, action) => ({
      ...state,
      tasks: action.tasks,
    })),
    on(TasksOrderByOptions.orderByDueDate, (state, _) => ({
      ...state,
      tasks: new TaskListSortContext(new TaskDueDateSortStrategy()).sort(
        state.tasks
      ),
    })),
    on(TasksOrderByOptions.orderByPriority, (state, _) => ({
      ...state,
      tasks: new TaskListSortContext(new TaskPrioritySortStrategy()).sort(
        state.tasks
      ),
    })),
    on(
      TaskOptionsMenuActions.viewTaskDetails,
      TaskCardActions.viewTaskDetails,
      EisenhowerMatrixActions.viewTaskDetails,
      (state, action) => ({
        ...state,
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
      ...state, // TODO: Maintain sort order
      tasks: state.tasks.concat(action.task),
    })),
    on(YataApiActions.loadTasksSuccess, (state, action) => ({
      ...state, // TODO: Maintain sort order
      tasks: action.tasks,
    })),
    on(YataApiActions.loadProjectSuccess, (state, action) => ({
      ...state, // TODO: Maintain sort order
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
        ...state,
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
        ...state,
        tasks,
      };
    }),
    on(TaskResolverActions.setCurrentTaskId, (state, action) => ({
      ...state,
      currentTaskId: action.taskId,
    })),
    on(TaskDetailsActions.resetCurrentTaskId, (state, _) => ({
      ...state,
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
        ...state,
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
