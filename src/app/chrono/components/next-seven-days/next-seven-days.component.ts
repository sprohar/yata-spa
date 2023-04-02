import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Section, Task } from '../../../models';
import { selectTasks } from '../../../store/selectors';

@Component({
  selector: 'yata-next-seven-days',
  templateUrl: './next-seven-days.component.html',
  styleUrls: ['./next-seven-days.component.scss'],
})
export class NextSevenDaysComponent {
  sections$ = this.store
    .select(selectTasks)
    .pipe(map((tasks) => this.groupByDueDate(tasks)));

  constructor(private store: Store) {}

  /**
   * Groups tasks by due date
   * @param tasks The tasks to sectionize
   * @returns An array of sections with the tasks grouped by due date
   */
  groupByDueDate(tasks: Task[]) {
    const sections: Section[] = [];
    const dueDates = tasks.map((task) => task.dueDate?.split('T').at(0));
    const uniqueDates = new Set<string | undefined>(dueDates);

    for (const date of uniqueDates) {
      const section: Section = {
        name: formatDate(new Date(date!), 'fullDate', navigator.language),
        projectId: -1,
        tasks: tasks.filter((task) => {
          const dueDate: string = task.dueDate!.split('T')!.at(0)!;
          return dueDate === date;
        }),
      };

      sections.push(section);
    }

    return sections;
  }
}
