import { Priority, Project, Section, Task } from '../../models';
import { AppState } from '../app.state';
import { initialAuthState } from '../reducers/auth.reducer';
import { SectionsState, selectSections } from '../reducers/sections.reducer';
import {
  selectCurrentSection,
  selectSectionsGroupedByProject,
  selectSectionsWithIncompleteTasks,
} from './sections.selectors';

const project1: Project = {
  id: 1,
  name: 'Project 1',
};
const project2 = {
  id: 2,
  name: 'Project 2',
};
const projects: Project[] = [project1, project2];

const tasks: Task[] = [
  {
    id: 1,
    title: 'Task 1',
    projectId: 1,
    sectionId: 1,
    isCompleted: false,
    priority: Priority.NONE,
  },
  {
    id: 2,
    title: 'Task 2',
    projectId: 1,
    sectionId: 2,
    isCompleted: true,
    priority: Priority.NONE,
  },
];

const sectionsState: SectionsState = {
  currentSectionId: 1,
  sections: [
    {
      id: 1,
      name: 'Section 1',
      projectId: 1,
    },
    {
      id: 2,
      name: 'Section 2',
      projectId: 1,
    },
  ],
};

const state: AppState = {
  auth: initialAuthState,
  projects: {
    currentProjectId: 1,
    projects,
  },
  sections: sectionsState,
  tasks: {
    currentTaskId: null,
    tasks,
    orderBy: null,
  },
};

describe('Sections Selectors', () => {
  it('should select the sections', () => {
    expect(selectSections.projector(sectionsState)).toEqual([
      {
        id: 1,
        name: 'Section 1',
        projectId: 1,
      },
      {
        id: 2,
        name: 'Section 2',
        projectId: 1,
      },
    ]);
  });

  describe('selectCurrentSection', () => {
    it('should select the current section', () => {
      expect(
        selectCurrentSection.projector(
          sectionsState.currentSectionId,
          sectionsState.sections
        )
      ).toEqual({
        id: 1,
        name: 'Section 1',
        projectId: 1,
      });
    });

    it('should return undefined when selecting the current section and currentSectionId is null', () => {
      expect(
        selectCurrentSection.projector(null, sectionsState.sections)
      ).not.toBeDefined();
    });

    it('should return undefined when selecting the current section and sections is empty', () => {
      expect(selectCurrentSection.projector(null, [])).not.toBeDefined();
    });
  });

  describe('selectSectionsWithIncompleteTasks', () => {
    it('should select the sections with incomplete tasks', () => {
      expect(
        selectSectionsWithIncompleteTasks.projector(
          state.projects.currentProjectId,
          state.sections.sections,
          state.tasks.tasks
        )
      ).toEqual([
        {
          id: 1,
          name: 'Section 1',
          projectId: 1,
          tasks: [
            {
              id: 1,
              title: 'Task 1',
              projectId: 1,
              sectionId: 1,
              isCompleted: false,
              priority: Priority.NONE,
            },
          ],
        },
      ]);
    });

    it('should return empty array when selecting the sections with incomplete tasks and currentProjectId is null', () => {
      expect(
        selectSectionsWithIncompleteTasks.projector(
          null,
          sectionsState.sections,
          tasks
        )
      ).toEqual([]);
    });

    it('should return empty array when selecting the sections with incomplete tasks and sections is empty', () => {
      expect(
        selectSectionsWithIncompleteTasks.projector(
          state.projects.currentProjectId,
          [],
          tasks
        )
      ).toEqual([]);
    });

    it('should return empty array when selecting the sections with incomplete tasks and tasks is empty', () => {
      expect(
        selectSectionsWithIncompleteTasks.projector(
          null,
          sectionsState.sections,
          []
        )
      ).toEqual([]);
    });
  });

  describe('selectSectionsWithTasks', () => {
    it('should select the sections with tasks', () => {
      expect(
        selectSectionsWithIncompleteTasks.projector(
          state.projects.currentProjectId,
          state.sections.sections,
          state.tasks.tasks
        )
      ).toEqual([
        {
          id: 1,
          name: 'Section 1',
          projectId: 1,
          tasks: [
            {
              id: 1,
              title: 'Task 1',
              projectId: 1,
              sectionId: 1,
              isCompleted: false,
              priority: Priority.NONE,
            },
          ],
        },
      ]);
    });

    it('should return empty array when selecting the sections with tasks and currentProjectId is null', () => {
      expect(
        selectSectionsWithIncompleteTasks.projector(
          null,
          sectionsState.sections,
          tasks
        )
      ).toEqual([]);
    });

    it('should return empty array when selecting the sections with tasks and sections is empty', () => {
      expect(
        selectSectionsWithIncompleteTasks.projector(
          state.projects.currentProjectId,
          [],
          tasks
        )
      ).toEqual([]);
    });

    it('should return empty array when selecting the sections with tasks and tasks is empty', () => {
      expect(
        selectSectionsWithIncompleteTasks.projector(
          null,
          sectionsState.sections,
          []
        )
      ).toEqual([]);
    });
  });

  describe('selectMoveToSectionsOptions', () => {
    it('should select the sections to move tasks to', () => {
      expect(
        selectSectionsWithIncompleteTasks.projector(
          state.projects.currentProjectId,
          state.sections.sections,
          state.tasks.tasks
        )
      ).toEqual([
        {
          id: 1,
          name: 'Section 1',
          projectId: 1,
          tasks: [
            {
              id: 1,
              title: 'Task 1',
              projectId: 1,
              sectionId: 1,
              isCompleted: false,
              priority: Priority.NONE,
            },
          ],
        },
      ]);
    });

    it('should return empty array when selecting the sections to move tasks to and currentProjectId is null', () => {
      expect(
        selectSectionsWithIncompleteTasks.projector(
          null,
          sectionsState.sections,
          tasks
        )
      ).toEqual([]);
    });

    it('should return empty array when selecting the sections to move tasks to and sections is empty', () => {
      expect(
        selectSectionsWithIncompleteTasks.projector(
          state.projects.currentProjectId,
          [],
          tasks
        )
      ).toEqual([]);
    });

    it('should return empty array when selecting the sections to move tasks to and tasks is empty', () => {
      expect(
        selectSectionsWithIncompleteTasks.projector(
          null,
          sectionsState.sections,
          []
        )
      ).toEqual([]);
    });
  });

  describe('selectSectionsGroupedBuProject', () => {
    it('should select the sections grouped by project', () => {
      const expected = new Map<Project, Section[]>();
      expected.set(project1, [
        {
          id: 1,
          name: 'Section 1',
          projectId: 1,
        },
        {
          id: 2,
          name: 'Section 2',
          projectId: 1,
        },
      ]);

      expected.set(project2, []);

      expect(
        selectSectionsGroupedByProject.projector(
          state.sections.sections,
          state.projects.projects
        )
      ).toEqual(expected);
    });

    it('should return an empty map when there are no projects in the store', () => {
      expect(
        selectSectionsGroupedByProject.projector(sectionsState.sections, [])
      ).toEqual(new Map<Project, Section[]>());
    });

    it('should return a map where the keys are all the projects from the store and each project has an empty array for sections when there are no sections in the store', () => {
      const expected = new Map<Project, Section[]>();
      expected.set(project1, []);
      expected.set(project2, []);

      expect(
        selectSectionsGroupedByProject.projector([], state.projects.projects)
      ).toEqual(expected);
    });
  });
});
