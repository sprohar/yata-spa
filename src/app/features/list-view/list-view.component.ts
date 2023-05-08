import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../models';
import {
  CreateTaskDialogComponent,
  CreateTaskDialogData,
} from '../../shared/components/create-task-dialog/create-task-dialog.component';
import {
  selectCompletedTasks,
  selectTasksGroupByProjectSections,
} from '../../store/selectors';

@Component({
  selector: 'yata-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
