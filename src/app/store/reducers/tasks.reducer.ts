import { createFeature, createReducer, on } from '@ngrx/store';
import { Task } from '../../models';
import {
  SortOrder,
  TasksDueDateSortStrategy,
  TasksPrioritySortStrategy,
  TasksSortContext,
} from '../../strategies/sort';
import {
  EisenhowerMatrixActions,
  TaskCardActions,
  TaskDetailsActions,
  TaskResolverActions,
  TasksOrderByOptionsActions,
  YataApiActions,
} from '../actions';

export interface TasksOrderByState {
  attribute: Task.OrderBy;
  dir: SortOrder;
}

export interface TasksState {
  currentTaskId: number | null;
  orderBy: TasksOrderByState | null;
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
    on(YataApiActions.loadTaskSuccess, (state, action) => ({
      ...state,
      currentTaskId: action.task.id!,
      tasks: state.tasks.map((t) =>
        t.id === action.task.id ? action.task : t
      ),
    })),
    on(YataApiActions.loadTasksSuccess, (state, action) => ({
      ...state,
      tasks: action.tasks,
    })),
    on(TasksOrderByOptionsActions.clearOrderBy, (state, _) => ({
      ...state,
      orderBy: null,
    })),
    on(TasksOrderByOptionsActions.setOrderBy, (state, { orderBy }) => {
      const context = new TasksSortContext(
        new TasksDueDateSortStrategy(orderBy.dir)
      );

      switch (orderBy.attribute) {
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
              .setStrategy(new TasksPrioritySortStrategy(orderBy.dir))
              .sort(state.tasks),
          };
        case Task.OrderBy.SECTION:
          return {
            ...state,
            orderBy: null,
          };
        default:
          return state;
      }
    }),
    on(
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
    on(YataApiActions.updateTaskSuccess, (state, action) => ({
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === action.task.id ? action.task : task
      ),
    })),
    on(YataApiActions.loadTaskSuccess, (state, action) => ({
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === action.task.id ? action.task : task
      ),
    })),
    on(TaskResolverActions.setCurrentTaskId, (state, action) => ({
      ...state,
      currentTaskId: action.taskId,
    })),
    on(TaskDetailsActions.resetCurrentTaskId, (state, _) => ({
      ...state,
      currentTaskId: null,
    })),
    on(YataApiActions.createSubtaskSuccess, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id !== action.subtask.parentId) return task;
          return {
            ...task,
            subtasks: task.subtasks
              ? task.subtasks.concat(action.subtask)
              : [action.subtask],
          } as Task;
        }),
      };
    }),
    on(YataApiActions.deleteSubtaskSuccess, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id !== action.subtask.parentId) return task;
          return {
            ...task,
            subtasks: task.subtasks!.filter(
              (subtask) => subtask.id !== action.subtask.id
            ),
          } as Task;
        }),
      };
    }),
    on(YataApiActions.updateSubtaskSuccess, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id !== action.subtask.parentId) return task;
          return {
            ...task,
            subtasks: task.subtasks?.map((subtask) =>
              subtask.id === action.subtask.id ? action.subtask : subtask
            ),
          } as Task;
        }),
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
