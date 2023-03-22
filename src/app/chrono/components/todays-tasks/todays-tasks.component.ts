import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { Task } from '../../../models';
import { selectTasks } from '../../../store/selectors';

@Component({
  selector: 'yata-todays-tasks',
  templateUrl: './todays-tasks.component.html',
  styleUrls: ['./todays-tasks.component.scss'],
})
export class TodaysTasksComponent {
  tasks$ = this.store.select(selectTasks).pipe(
    tap((tasks) => {
      this.today = this.getSectionName(tasks.at(0)!) ?? ''
    })
  );
  today = '';

  constructor(private store: Store) { }

  getSectionName(task: Task) {
    return new DatePipe(navigator.language).transform(task.dueDate, 'fullDate');
  }
}
