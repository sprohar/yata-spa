import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Grouped } from '../../../interfaces';
import { Section, Task } from '../../../models';
import { selectTasksGroupByDueDate } from '../../../store/selectors';

@Component({
  selector: 'yata-next-seven-days',
  templateUrl: './next-seven-days.component.html',
  styleUrls: ['./next-seven-days.component.scss'],
})
export class NextSevenDaysComponent {
  sections$ = this.store
    .select(selectTasksGroupByDueDate)
    .pipe(map((tasks: Grouped<Task>) => this.toSections(tasks)));

  constructor(private store: Store) {}

  toSections(tasks: Grouped<Task>) {
    const sections: Section[] = [];
    Object.keys(tasks).forEach((key) => {
      const section: Section = {
        name: formatDate(new Date(key), 'fullDate', navigator.language),
        projectId: -1,
        tasks: tasks[key],
      };
      sections.push(section);
    });

    return sections;
  }
}
