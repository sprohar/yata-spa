import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTasks } from '../../../../store/selectors';

@Component({
  selector: 'yata-todays-tasks',
  templateUrl: './todays-tasks.component.html',
  styleUrls: ['./todays-tasks.component.scss'],
})
export class TodaysTasksComponent {
  today = new Date();
  tasks$ = this.store.select(selectTasks);

  constructor(private store: Store) {}
}
