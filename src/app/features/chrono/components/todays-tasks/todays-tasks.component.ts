import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskView } from '../../../../interfaces';
import { Task } from '../../../../models';
import { PreferencesService } from '../../../../settings/services/preferences.service';
import { selectTasks } from '../../../../store/selectors';

@Component({
  selector: 'yata-todays-tasks',
  templateUrl: './todays-tasks.component.html',
  styleUrls: ['./todays-tasks.component.scss'],
})
export class TodaysTasksComponent {
  readonly userPreferences = this.preferences.get();
  readonly TASK_VIEW_MINIMALIST = TaskView.MINIMALIST;
  readonly TASK_VIEW_INFORMATIVE = TaskView.INFORMATIVE;

  today = new Date();
  tasks$ = this.store.select(selectTasks);

  constructor(
    private readonly preferences: PreferencesService,
    private readonly store: Store
  ) {}

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
