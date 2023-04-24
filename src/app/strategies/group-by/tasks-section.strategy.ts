import { Section, Task } from '../../models';

export function groupProjectTasksBySection(
  sections: Section[],
  tasks: Task[],
  projectId: number
): Map<Section, Task[]> {
  const map = new Map<Section, Task[]>();
  const unsectionedTasks = tasks.filter(
    (task) => !task.isCompleted && !task.sectionId
  );

  if (unsectionedTasks.length > 0) {
    const unsectioned: Section = {
      name: 'No section',
      projectId,
    };
    map.set(unsectioned, unsectionedTasks);
  }

  return sections.reduce((group, section) => {
    group.set(
      section,
      tasks.filter((task) => !task.isCompleted && task.sectionId === section.id)
    );
    return group;
  }, map);
}
