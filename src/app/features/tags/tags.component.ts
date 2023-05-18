import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from '../../models';
import { TaskListComponent } from '../../shared/components/task-list/task-list.component';
import { TaskOptionsComponent } from '../../shared/components/task-options/task-options.component';
import { TaskComponent } from '../../shared/components/task/task.component';
import { ViewHeaderComponent } from '../../shared/components/view-header/view-header.component';
import {
  selectCurrentTag,
  selectTasksGroupByProject,
} from '../../store/selectors';

@Component({
  selector: 'yata-tags',
  styleUrls: ['./tags.component.scss'],
  templateUrl: './tags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    ViewHeaderComponent,
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
export class TagsComponent {
  readonly currentTag$ = this.store.select(selectCurrentTag);
  readonly tasksGroupedByTags$ = this.store.select(selectTasksGroupByProject);

  constructor(private readonly store: Store) {}

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
