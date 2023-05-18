import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../models';
import {
  CreateTaskDialogComponent,
  CreateTaskDialogData,
} from '../../shared/components/create-task-dialog/create-task-dialog.component';
import { SectionOptionsComponent } from '../../shared/components/section-options/section-options.component';
import { TaskListComponent } from '../../shared/components/task-list/task-list.component';
import { TaskOptionsComponent } from '../../shared/components/task-options/task-options.component';
import { TaskComponent } from '../../shared/components/task/task.component';
import { ViewHeaderComponent } from '../../shared/components/view-header/view-header.component';
import {
  selectCompletedTasks,
  selectTasksGroupByProjectSections,
} from '../../store/selectors';

@Component({
  selector: 'yata-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ViewHeaderComponent,
    NgIf,
    CdkDropListGroup,
    NgFor,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    SectionOptionsComponent,
    TaskListComponent,
    CdkDropList,
    TaskComponent,
    CdkDrag,
    TaskOptionsComponent,
    RouterOutlet,
    AsyncPipe,
    KeyValuePipe,
  ],
})
export class ListViewComponent {
  readonly completedTasks$ = this.store.select(selectCompletedTasks);
  readonly groupedTasks$ = this.store.select(selectTasksGroupByProjectSections);

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {}

  openCreateTaskDialog(section: Section) {
    this.dialog.open(CreateTaskDialogComponent, {
      data: {
        section,
      } as CreateTaskDialogData,
    });
  }

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
