import { Section, Task } from '../../models';

export function groupProjectTasksBySection(
  sections: Section[],
  tasks: Task[],
  projectId: number
): Map<Section, Task[]> {
  const unsectioned: Section = {
    name: 'No section',
    projectId,
  };

  const map = new Map<Section, Task[]>();
  map.set(
    unsectioned,
    tasks.filter((task) => !task.isCompleted && !task.sectionId)
  );

  return sections.reduce((group, section) => {
    group.set(
      section,
      tasks.filter((task) => !task.isCompleted && task.sectionId === section.id)
    );
    return group;
  }, map);
}
