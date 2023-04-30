import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskView } from '../../interfaces';
import { Section, Task } from '../../models';
import {
  CreateTaskDialogComponent,
  CreateTaskDialogData,
} from '../../shared/components/create-task-dialog/create-task-dialog.component';
import {
  selectCompletedTasks,
  selectTasksGroupByProjectSections,
  selectUserPreferences,
} from '../../store/selectors';

@Component({
  selector: 'yata-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent {
  readonly TASK_VIEW_MINIMALIST = TaskView.MINIMALIST;
  readonly TASK_VIEW_INFORMATIVE = TaskView.INFORMATIVE;
  readonly completedTasks$ = this.store.select(selectCompletedTasks);
  readonly groupedTasks$ = this.store.select(selectTasksGroupByProjectSections);
  readonly userPreferences$ = this.store.select(selectUserPreferences);

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
