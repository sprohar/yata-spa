import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Section, Task } from '../models';
import {
  selectCompletedTasks,
  selectSectionsWithIncompleteTasks,
  selectUnsectionedTasks,
} from '../store/selectors';

@Component({
  selector: 'yata-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent {
  completedTasks$ = this.store.select(selectCompletedTasks);
  unsectionedTasks$ = this.store.select(selectUnsectionedTasks);
  sections$ = this.store.select(selectSectionsWithIncompleteTasks);

  constructor(private store: Store) {}

  createCompletedSection(completedTasks: Task[]) {
    return {
      name: 'Completed',
      tasks: completedTasks,
      projectId: completedTasks[0].projectId,
    } as Section;
  }
}
