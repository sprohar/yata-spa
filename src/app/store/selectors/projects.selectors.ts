import { createSelector } from '@ngrx/store';
import { Project, Section, Task } from '../../models';
import {
  selectCurrentProjectId,
  selectProjects,
} from '../reducers/projects.reducer';
import { selectTasks } from '../reducers/tasks.reducer';

export const selectCurrentProject = createSelector(
  selectCurrentProjectId,
  selectProjects,
  (projectId: number | null, projects: Project[]) =>
    projects.find((p) => p.id === projectId)
);

export const selectProjectSections = createSelector(
  selectCurrentProject,
  selectTasks,
  (project: Project | undefined, tasks: Task[]) => {
    if (!project || !project.sections) {
      return [] as Section[];
    }

    const sections: Section[] = [];
    for (const section of project.sections) {
      sections.push({
        ...section,
        tasks: tasks.filter(
          (task) => task.sectionId && task.sectionId === section.id
        ),
      });
    }

    return sections;
  }
);
