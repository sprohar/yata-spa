import { Priority, Project, Task } from '../../models';
import { SortOrder } from '../../strategies/sort';
import {
  EisenhowerMatrixActions,
  TaskCardActions,
  TaskDetailsActions,
  TaskResolverActions,
  TasksOrderByOptionsActions,
  YataApiActions,
} from '../actions';
import * as fromTasks from './tasks.reducer';

describe('Tasks Reducer', () => {
  describe('YataApiActions.loadTaskSuccess', () => {
    it('should replace the existing task in the store with the task that was fetched from the API', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [{ id: 1, title: 'Task 1', projectId: 1 }],
      };

      const updatedTask: Task = { id: 1, title: 'Updated', projectId: 1 };
      const action = YataApiActions.loadTaskSuccess({
        task: updatedTask,
      });

      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        currentTaskId: updatedTask.id!,
        tasks: [updatedTask],
      });
    });
  });

  describe('YataApiActions.loadTasksSuccess', () => {
    it('should replace the existing tasks in the store with the tasks that were fetched from the API', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [{ id: 1, title: 'Task 1', projectId: 1 }],
      };

      const tasks: Task[] = [
        { id: 1, title: 'Task 1', projectId: 1 },
        { id: 2, title: 'Task 2', projectId: 1 },
      ];

      const action = YataApiActions.loadTasksSuccess({ tasks });
      const state = fromTasks.reducer(initialState, action);

      expect(state.tasks.length).toEqual(tasks.length);
    });
  });

  describe('TasksOrderByOptionsActions.clearOrderBy', () => {
    it('should set the orderBy state to null', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: { attribute: Task.OrderBy.DUE_DATE, dir: SortOrder.ASC },
        tasks: [],
      };

      const action = TasksOrderByOptionsActions.clearOrderBy();

      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        orderBy: null,
      });
    });
  });

  describe('TasksOrderByOptionsActions.setOrderBy', () => {
    it('should set the orderBy state to sort the tasks in ascending order by dueDate', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [
          { id: 2, title: 'Task 2', projectId: 1, dueDate: '2020-01-02' },
          { id: 1, title: 'Task 1', projectId: 1, dueDate: '2020-01-01' },
        ],
      };

      const orderBy = { attribute: Task.OrderBy.DUE_DATE, dir: SortOrder.ASC };
      const action = TasksOrderByOptionsActions.setOrderBy({ orderBy });
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        orderBy,
        tasks: [
          { id: 1, title: 'Task 1', projectId: 1, dueDate: '2020-01-01' },
          { id: 2, title: 'Task 2', projectId: 1, dueDate: '2020-01-02' },
        ],
      });
    });

    it('should set the orderBy state to sort the tasks in descending order by dueDate', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [
          { id: 1, title: 'Task 1', projectId: 1, dueDate: '2020-01-01' },
          { id: 2, title: 'Task 2', projectId: 1, dueDate: '2020-01-02' },
        ],
      };

      const orderBy = { attribute: Task.OrderBy.DUE_DATE, dir: SortOrder.DESC };
      const action = TasksOrderByOptionsActions.setOrderBy({ orderBy });
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        orderBy,
        tasks: [
          { id: 2, title: 'Task 2', projectId: 1, dueDate: '2020-01-02' },
          { id: 1, title: 'Task 1', projectId: 1, dueDate: '2020-01-01' },
        ],
      });
    });

    it('should set the orderBy state to sort the tasks in ascending order by priority', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [
          { id: 2, title: 'Task 2', projectId: 1, priority: Priority.HIGH },
          { id: 1, title: 'Task 1', projectId: 1, priority: Priority.LOW },
        ],
      };

      const orderBy = { attribute: Task.OrderBy.PRIORITY, dir: SortOrder.ASC };
      const action = TasksOrderByOptionsActions.setOrderBy({ orderBy });
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        orderBy,
        tasks: [
          { id: 1, title: 'Task 1', projectId: 1, priority: Priority.LOW },
          { id: 2, title: 'Task 2', projectId: 1, priority: Priority.HIGH },
        ],
      });
    });

    it('should set the orderBy state to sort the tasks in descending order by priority', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [
          { id: 1, title: 'Task 1', projectId: 1, priority: Priority.LOW },
          { id: 2, title: 'Task 2', projectId: 1, priority: Priority.HIGH },
        ],
      };

      const orderBy = { attribute: Task.OrderBy.PRIORITY, dir: SortOrder.DESC };
      const action = TasksOrderByOptionsActions.setOrderBy({ orderBy });
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        orderBy,
        tasks: [
          { id: 2, title: 'Task 2', projectId: 1, priority: Priority.HIGH },
          { id: 1, title: 'Task 1', projectId: 1, priority: Priority.LOW },
        ],
      });
    });
  });

  describe('TaskCardActions.viewTaskDetails', () => {
    it('should set the currentTaskId state to the id of the task that was clicked', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [{ id: 1, title: 'Task 1', projectId: 1 }],
      };

      const action = TaskCardActions.viewTaskDetails({ taskId: 1 });
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        currentTaskId: 1,
      });
    });
  });

  describe('EisenhowerMatrixActions.viewTaskDetails', () => {
    it('should set the currentTaskId state to the id of the task that was clicked', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [{ id: 1, title: 'Task 1', projectId: 1 }],
      };

      const action = EisenhowerMatrixActions.viewTaskDetails({ taskId: 1 });
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        currentTaskId: 1,
      });
    });
  });

  describe('YataApiActions.deleteTaskSuccess', () => {
    it('should remove the task from the tasks state', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [{ id: 1, title: 'Task 1', projectId: 1 }],
      };

      const action = YataApiActions.deleteTaskSuccess({
        task: initialState.tasks[0],
      });

      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        tasks: [],
      });
    });
  });

  describe('YataApiActions.moveSectionToProjectSuccess', () => {
    it('should update the projectId of every task in the store', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [
          { id: 1, title: 'Task 1', projectId: 1 },
          { id: 2, title: 'Task 2', projectId: 1 },
        ],
      };

      const action = YataApiActions.moveSectionToProjectSuccess({
        section: {
          id: 1,
          name: 'Section 1',
          projectId: 2,
        },
      });

      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        tasks: [
          { id: 1, title: 'Task 1', projectId: 2 },
          { id: 2, title: 'Task 2', projectId: 2 },
        ],
      });
    });
  });

  describe('YataApiActions.createTaskSuccess', () => {
    it('should add the task to the tasks state', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [],
      };

      const task: Task = { id: 1, title: 'Task 1', projectId: 1 };
      const action = YataApiActions.createTaskSuccess({ task });
      const state = fromTasks.reducer(initialState, action);

      expect(state.tasks.length).toBe(1);
    });
  });

  describe('YataApiActions.loadProjectSuccess', () => {
    it('should set the tasks state to the tasks of the project', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [],
      };

      const tasks = [
        { id: 1, title: 'Task 1', projectId: 1 },
        { id: 2, title: 'Task 2', projectId: 1 },
      ];

      const project: Project = {
        id: 1,
        name: 'Project 1',
        sections: [
          {
            id: 1,
            name: 'Section 1',
            projectId: 1,
          },
        ],
        tasks,
      };

      const action = YataApiActions.loadProjectSuccess({ project });
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        tasks,
      });
    });
  });

  describe('YataApiActions.updateTaskSuccess', () => {
    it('should update the task in the tasks state', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [{ id: 1, title: 'Task 1', projectId: 1 }],
      };

      const task: Task = { id: 1, title: 'Updated', projectId: 1 };
      const action = YataApiActions.updateTaskSuccess({ task });
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        tasks: [task],
      });
    });
  });

  describe('TaskResolverActions.setCurrentTaskId', () => {
    it('should set the currentTaskId state to the id of the task that was clicked', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [{ id: 1, title: 'Task 1', projectId: 1 }],
      };

      const action = TaskResolverActions.setCurrentTaskId({ taskId: 1 });
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        currentTaskId: 1,
      });
    });
  });

  describe('TaskDetailsActions.clearCurrentTaskId', () => {
    it('should set the currentTaskId state to null', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: 1,
        orderBy: null,
        tasks: [{ id: 1, title: 'Task 1', projectId: 1 }],
      };

      const action = TaskDetailsActions.clearCurrentTaskId();
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        currentTaskId: null,
      });
    });
  });

  describe('YataApiActions.createSubtaskSuccess', () => {
    it('should add the subtask to the tasks state', () => {
      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [{ id: 1, title: 'Task 1', projectId: 1 }],
      };

      const subtask: Task = {
        id: 1,
        title: 'Subtask 1',
        parentId: 1,
        projectId: 1,
      };

      const action = YataApiActions.createSubtaskSuccess({ subtask });
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        tasks: [
          {
            id: 1,
            title: 'Task 1',
            projectId: 1,
            subtasks: [subtask],
          },
        ],
      });
    });
  });

  describe('YataApiActions.deleteSubtaskSuccess', () => {
    it('should remove the subtask from the task', () => {
      const subtask: Task = {
        id: 1,
        title: 'Subtask 1',
        parentId: 1,
        projectId: 1,
      };

      const task = {
        id: 1,
        title: 'Task 1',
        projectId: 1,
        subtasks: [subtask],
      };

      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [task],
      };

      const action = YataApiActions.deleteSubtaskSuccess({ subtask });
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        tasks: [
          {
            ...task,
            subtasks: [],
          },
        ],
      });
    });
  });

  describe('YataApiActions.updateSubtaskSuccess', () => {
    it('should update the subtask in the task', () => {
      const subtask: Task = {
        id: 1,
        title: 'Subtask 1',
        parentId: 1,
        projectId: 1,
      };

      const task = {
        id: 1,
        title: 'Task 1',
        projectId: 1,
        subtasks: [subtask],
      };

      const initialState: fromTasks.TasksState = {
        currentTaskId: null,
        orderBy: null,
        tasks: [task],
      };

      const updatedSubtask: Task = {
        ...subtask,
        title: 'Updated',
      };

      const action = YataApiActions.updateSubtaskSuccess({ subtask: updatedSubtask });
      const state = fromTasks.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        tasks: [
          {
            ...task,
            subtasks: [updatedSubtask],
          },
        ],
      });
    });
  });
});
