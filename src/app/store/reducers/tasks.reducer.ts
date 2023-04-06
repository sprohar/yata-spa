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
  currentTaskId: number | null;
  orderBy: Task.OrderBy | null;
  tasks: Task[];
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
    on(TasksOrderByOptions.clearOrderBy, (state, _) => ({
      ...state,
      orderBy: null,
    })),
    on(TasksOrderByOptions.setOrderBy, (state, action) => {
      const context = new TaskListSortContext(new TaskDueDateSortStrategy());
      const { orderBy } = action;

      switch (orderBy) {
        case Task.OrderBy.DUE_DATE:
          return {
            ...state,
            orderBy,
            tasks: context.sort(state.tasks),
          };
        case Task.OrderBy.PRIORITY:
          return {
            ...state,
            orderBy,
            tasks: context
              .setStrategy(new TaskPrioritySortStrategy())
              .sort(state.tasks),
          };
        default:
          return state;
      }
    }),
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
  selectOrderBy,
  selectTasks,
  selectTasksState,
} = tasksFeature;
