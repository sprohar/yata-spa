import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserPreference } from '../../auth/models/user.model';
import { TaskView } from '../../interfaces';
import { Task } from '../../models';
import {
  selectCurrentTag,
  selectTasksGroupByProject,
} from '../../store/selectors';
import { PreferencesService } from '../preferences/services/preferences.service';

@Component({
  selector: 'yata-tags',
  styleUrls: ['./tags.component.scss'],
  templateUrl: './tags.component.html',
})
export class TagsComponent {
  readonly userPreferences: UserPreference | null = this.preferences.get();
  readonly TASK_VIEW_MINIMALIST = TaskView.MINIMALIST;
  readonly TASK_VIEW_INFORMATIVE = TaskView.INFORMATIVE;

  currentTag$ = this.store.select(selectCurrentTag);
  tasksGroupedByTags$ = this.store.select(selectTasksGroupByProject);

  constructor(
    private readonly preferences: PreferencesService,
    private readonly store: Store
  ) {}

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
