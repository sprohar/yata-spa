import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../models';
import {
  selectCurrentTag,
  selectTasksGroupByProject,
} from '../../store/selectors';

@Component({
  selector: 'yata-tags',
  styleUrls: ['./tags.component.scss'],
  templateUrl: './tags.component.html',
})
export class TagsComponent {
  currentTag$ = this.store.select(selectCurrentTag);
  tasksGroupedByTags$ = this.store.select(selectTasksGroupByProject);

  constructor(private readonly store: Store) {}

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
