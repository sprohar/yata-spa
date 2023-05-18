import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from '../../../../models';
import { TaskListComponent } from '../../../../shared/components/task-list/task-list.component';
import { TaskOptionsComponent } from '../../../../shared/components/task-options/task-options.component';
import { TaskComponent } from '../../../../shared/components/task/task.component';
import { ViewHeaderComponent } from '../../../../shared/components/view-header/view-header.component';
import {
  selectCompletedTasks,
  selectIncompleteTasks,
} from '../../../../store/selectors';

@Component({
  selector: 'yata-todays-tasks',
  templateUrl: './todays-tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ViewHeaderComponent,
    NgIf,
    MatExpansionModule,
    TaskListComponent,
    NgFor,
    TaskComponent,
    TaskOptionsComponent,
    RouterOutlet,
    AsyncPipe,
    DatePipe,
  ],
})
export class TodaysTasksComponent {
  readonly completedTasks$ = this.store.select(selectCompletedTasks);
  readonly tasks$ = this.store.select(selectIncompleteTasks);
  readonly today = new Date();

  constructor(private readonly store: Store) {}

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
