import { Priority, Section, Task } from '../../models';

export function groupTasksByPriority(tasks: Task[]): Map<Section, Task[]> {
  const prioritySections: Section[] = [
    { id: Priority.NONE, projectId: 0, name: 'No priority' },
    { id: Priority.LOW, projectId: 0, name: 'Low priority' },
    { id: Priority.MEDIUM, projectId: 0, name: 'Medium priority' },
    { id: Priority.HIGH, projectId: 0, name: 'High priority' },
  ];

  return tasks.reduce((map, task) => {
    if (task.priority === undefined) return map;

    const prioritySection = prioritySections.find(
      (s) => s.id === task.priority
    );

    if (!prioritySection) return map;

    const tasks = map.get(prioritySection);
    tasks ? tasks.push(task) : map.set(prioritySection, [task]);
    return map;
  }, new Map<Section, Task[]>());
}
