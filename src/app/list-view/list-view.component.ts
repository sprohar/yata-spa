import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCompletedTasks, selectGroupedTasks } from '../store/selectors';

@Component({
  selector: 'yata-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent {
  completedTasks$ = this.store.select(selectCompletedTasks);
  groupedTasks$ = this.store.select(selectGroupedTasks);

  constructor(private store: Store) {}
}
