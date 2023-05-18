import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskView } from '../../interfaces';
import { Task } from '../../models';
import { TaskListComponent } from '../../shared/components/task-list/task-list.component';
import { TaskOptionsComponent } from '../../shared/components/task-options/task-options.component';
import { TaskComponent } from '../../shared/components/task/task.component';
import { ViewHeaderComponent } from '../../shared/components/view-header/view-header.component';
import {
  selectTasksGroupByProjectSections,
  selectUserPreferences,
} from '../../store/selectors';

@Component({
  selector: 'yata-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ViewHeaderComponent,
    NgIf,
    NgFor,
    MatExpansionModule,
    TaskListComponent,
    TaskComponent,
    TaskOptionsComponent,
    RouterOutlet,
    AsyncPipe,
    KeyValuePipe,
  ],
})
export class InboxComponent {
  readonly TASK_VIEW_MINIMALIST = TaskView.MINIMALIST;
  readonly TASK_VIEW_INFORMATIVE = TaskView.INFORMATIVE;
  readonly userPreferences$ = this.store.select(selectUserPreferences);
  readonly group$ = this.store.select(selectTasksGroupByProjectSections);

  constructor(private readonly store: Store) {}

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
