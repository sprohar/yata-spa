import { Priority } from '../../models';
import { AppState } from '../app.state';
import { initialAuthState } from '../reducers/auth.reducer';
import { initialSectionsState } from '../reducers/sections.reducer';
import {
  selectCompletedHighPriorityTasks,
  selectCompletedLowPriorityTasks,
  selectCompletedMediumPriorityTasks,
  selectCompletedNoPriorityTasks,
  selectHighPriorityTasksGroupByProject,
  selectMediumPriorityTasksGroupByProject,
} from './eisenhower-matrix.selectors';

const state: AppState = {
  auth: initialAuthState,
  sections: initialSectionsState,
  projects: {
    currentProjectId: null,
    projects: [{ id: 1, name: 'Project 1' }],
  },
  tasks: {
    currentTaskId: null,
    orderBy: null,
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        priority: Priority.HIGH,
        isCompleted: false,
        projectId: 1,
      },
      {
        id: 2,
        title: 'Task 2',
        priority: Priority.HIGH,
        isCompleted: true,
        projectId: 1,
      },
      {
        id: 3,
        title: 'Task 3',
        priority: Priority.MEDIUM,
        isCompleted: false,
        projectId: 1,
      },
      {
        id: 4,
        title: 'Task 4',
        priority: Priority.MEDIUM,
        isCompleted: true,
        projectId: 1,
      },
      {
        id: 5,
        title: 'Task 5',
        priority: Priority.LOW,
        isCompleted: false,
        projectId: 1,
      },
      {
        id: 6,
        title: 'Task 6',
        priority: Priority.LOW,
        isCompleted: true,
        projectId: 1,
      },
      {
        id: 7,
        title: 'Task 7',
        priority: Priority.NONE,
        isCompleted: false,
        projectId: 1,
      },
      {
        id: 8,
        title: 'Task 8',
        priority: Priority.NONE,
        isCompleted: true,
        projectId: 1,
      },
    ],
  },
};

describe('EisenhowerMatrixSelectors', () => {
  const projects = state.projects.projects;
  const tasks = state.tasks.tasks;

  it('should select completed high priority tasks', () => {
    const actual = selectCompletedHighPriorityTasks.projector(tasks);
    const expected = state.tasks.tasks.filter(
      (task) => task.isCompleted && task.priority === Priority.HIGH
    );

    expect(actual.length).toEqual(expected.length);
  });

  it('should select completed medium priority tasks', () => {
    const completedMediumPriorityTasks =
      selectCompletedMediumPriorityTasks.projector(tasks);

    expect(completedMediumPriorityTasks.length).toEqual(1);
    expect(completedMediumPriorityTasks[0].id).toEqual(4);
  });

  it('should select completed low priority tasks', () => {
    const completedLowPriorityTasks =
      selectCompletedLowPriorityTasks.projector(tasks);

    expect(completedLowPriorityTasks.length).toEqual(1);
    expect(completedLowPriorityTasks[0].id).toEqual(6);
  });

  it('should select completed no priority tasks', () => {
    const completedNoPriorityTasks =
      selectCompletedNoPriorityTasks.projector(tasks);

    expect(completedNoPriorityTasks.length).toEqual(1);
    expect(completedNoPriorityTasks[0].id).toEqual(8);
  });

  it('should select high priority tasks group by project', () => {
    const highPriorityTasksGroupByProject =
      selectHighPriorityTasksGroupByProject.projector(projects, tasks);

    expect(highPriorityTasksGroupByProject.size).toEqual(1);
    expect(
      highPriorityTasksGroupByProject.get(state.projects.projects[0])?.length
    ).toEqual(1);
    expect(
      highPriorityTasksGroupByProject.get(state.projects.projects[0])?.[0].id
    ).toEqual(1);
  });

  it('should select medium priority tasks group by project', () => {
    const mediumPriorityTasksGroupByProject =
      selectMediumPriorityTasksGroupByProject.projector(projects, tasks);

    expect(mediumPriorityTasksGroupByProject.size).toEqual(1);
    expect(
      mediumPriorityTasksGroupByProject.get(state.projects.projects[0])?.length
    ).toEqual(1);
    expect(
      mediumPriorityTasksGroupByProject.get(state.projects.projects[0])?.[0].id
    ).toEqual(3);
  });

  it('should select low priority tasks group by project', () => {
    const lowPriorityTasksGroupByProject =
      selectMediumPriorityTasksGroupByProject.projector(projects, tasks);

    expect(lowPriorityTasksGroupByProject.size).toEqual(1);
    expect(
      lowPriorityTasksGroupByProject.get(state.projects.projects[0])?.length
    ).toEqual(1);
    expect(
      lowPriorityTasksGroupByProject.get(state.projects.projects[0])?.[0].id
    ).toEqual(3);
  });

  it('should select no priority tasks group by project', () => {
    const noPriorityTasksGroupByProject =
      selectMediumPriorityTasksGroupByProject.projector(projects, tasks);

    expect(noPriorityTasksGroupByProject.size).toEqual(1);
    expect(
      noPriorityTasksGroupByProject.get(state.projects.projects[0])?.length
    ).toEqual(1);
    expect(
      noPriorityTasksGroupByProject.get(state.projects.projects[0])?.[0].id
    ).toEqual(3);
  });
});
