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
  sections$ = this.store.select(selectTasks).pipe(
    map((tasks) => this.sectionize(tasks))
  );

  constructor(private store: Store) {}

  sectionize(tasks: Task[]) {
    const sections: Section[] = [];
    const datesSet = new Set<string | undefined>(tasks.map(task => task.dueDate?.split('T').at(0)));

    datesSet.forEach((date) => {
      const section: Section = {
        name: formatDate(new Date(date!), 'fullDate', navigator.language),
        projectId: -1,
        tasks: tasks.filter((task) => {
          const dueDate: string = task.dueDate!.split('T')!.at(0)!;
          return dueDate === date;  
        }),
      };

      sections.push(section);
    });

    return sections;
  }
}
