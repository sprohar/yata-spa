import { formatDate } from '@angular/common';
import { Section, Task } from '../../models';

export function groupTasksByDueDate(tasks: Task[]): Map<Section, Task[]> {
  const noDueDateSection: Section = {
    projectId: -1,
    name: 'No due date',
    dragDropData: {
      dueDate: null,
    },
  };

  const dateSections: Section[] = [noDueDateSection];
  return tasks
    .filter((task) => !task.isCompleted)
    .reduce((map, task) => {
      if (!task.dueDate) {
        const value = map.get(noDueDateSection);
        value ? value.push(task) : map.set(noDueDateSection, [task]);
        return map;
      }

      const date = formatDate(
        task.dueDate.split('T').at(0)!,
        'fullDate',
        navigator.language
      );

      const section = dateSections.find((s) => s.name === date);
      if (!section) {
        const newDateSection: Section = {
          projectId: -1,
          name: date,
          dragDropData: {
            dueDate: task.dueDate,
          },
        };

        map.set(newDateSection, [task]);
        dateSections.push(newDateSection);

        return map;
      }

      map.get(section)?.push(task);
      return map;
    }, new Map<Section, Task[]>());
}
