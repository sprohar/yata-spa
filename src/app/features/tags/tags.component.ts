import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskView } from '../../interfaces';
import { Task } from '../../models';
import {
  selectCurrentTag,
  selectTasksGroupByProject,
  selectUserPreferences,
} from '../../store/selectors';

@Component({
  selector: 'yata-tags',
  styleUrls: ['./tags.component.scss'],
  templateUrl: './tags.component.html',
})
export class TagsComponent {
  readonly TASK_VIEW_MINIMALIST = TaskView.MINIMALIST;
  readonly TASK_VIEW_INFORMATIVE = TaskView.INFORMATIVE;

  currentTag$ = this.store.select(selectCurrentTag);
  tasksGroupedByTags$ = this.store.select(selectTasksGroupByProject);
  preferences$ = this.store.select(selectUserPreferences);

  constructor(private readonly store: Store) {}

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
