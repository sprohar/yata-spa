import { createSelector } from '@ngrx/store';
import { Section } from '../../models';
import { selectCurrentProjectId } from '../reducers/projects.reducer';
import {
  selectCurrentSectionId,
  selectSections,
} from '../reducers/sections.reducer';
import { selectTasks } from '../reducers/tasks.reducer';

export const selectCurrentSection = createSelector(
  selectCurrentSectionId,
  selectSections,
  (sectionId, sections) => sections.find((s) => s.id === sectionId)
);

export const selectKanbanColumns = createSelector(
  selectCurrentProjectId,
  selectSections,
  selectTasks,
  (projectId, sections, tasks) => {
    const collection: Section[] = [];
    for (const section of sections) {
      collection.push({
        ...section,
        tasks: tasks.filter(
          (task) =>
            task.sectionId === section.id && task.projectId === projectId
        ),
      });
    }
    return collection;
  }
);
