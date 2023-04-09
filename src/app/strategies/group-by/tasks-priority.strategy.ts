import { Priority, Section, Task } from '../../models';

export function groupTasksByPriority(tasks: Task[]): Map<Section, Task[]> {
  const sections: Section[] = [
    {
      dragDropData: { priority: Priority.NONE },
      projectId: -1,
      name: 'No priority',
    },
    {
      dragDropData: { priority: Priority.LOW },
      projectId: -1,
      name: 'Low priority',
    },
    {
      dragDropData: { priority: Priority.MEDIUM },
      projectId: -1,
      name: 'Medium priority',
    },
    {
      dragDropData: { priority: Priority.HIGH },
      projectId: -1,
      name: 'High priority',
    },
  ];

  return tasks
    .filter((task) => !task.isCompleted)
    .reduce((map, task) => {
      if (task.priority === undefined) return map;
      const section = sections.find(
        (section) => section.dragDropData?.priority === task.priority
      );

      if (!section) return map;

      const tasks = map.get(section);
      tasks ? tasks.push(task) : map.set(section, [task]);

      return map;
    }, new Map<Section, Task[]>());
}
