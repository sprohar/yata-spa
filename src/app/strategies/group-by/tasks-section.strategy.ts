import { Section, Task } from '../../models';

export function groupTasksBySections(
  sections: Section[],
  tasks: Task[]
): Map<Section, Task[]> {
  const unsectioned: Section = {
    id: -1,
    name: 'Unsectioned',
    projectId: tasks.at(0)!.projectId,
  };

  return tasks.reduce((map, task) => {
    if (task.sectionId === undefined) {
      const value = map.get(unsectioned);
      value ? value.push(task) : map.set(unsectioned, [task]);
      return map;
    }

    const section = sections.find((section) => section.id === task.sectionId);

    if (!section) return map;
    const tasks = map.get(section);
    tasks ? tasks.push(task) : map.set(section, [task]);

    return map;
  }, new Map<Section, Task[]>());
}
