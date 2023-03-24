import { createSelector } from '@ngrx/store';
import { Section } from '../../models';
import { selectProjects } from '../reducers/projects.reducer';
import { selectCurrentTagId, selectTags } from '../reducers/tags.reducer';
import { selectTasks } from '../reducers/tasks.reducer';

export const selectCurrentTag = createSelector(
  selectCurrentTagId,
  selectTags,
  (currentTagId, tags) => tags.find((tag) => tag.id === currentTagId)
);

export const selectCategorizedTasks = createSelector(
  selectTasks,
  selectProjects,
  (tasks, projects) => {
    const collection: Section[] = [];
    const projectIdsSet = new Set<number>(tasks.map((t) => t.projectId));

    for (const projectId of projectIdsSet) {
      const project = projects.find((p) => p.id === projectId);
      collection.push({
        projectId,
        name: project!.name,
        tasks: tasks.filter((t) => t.projectId === projectId),
      });
    }

    return collection;
  }
);
