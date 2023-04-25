import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskView } from '../../interfaces';
import { Section, Task } from '../../models';
import { CreateTaskDialogComponent } from '../../shared/components/create-task-dialog/create-task-dialog.component';
import { selectPreferences } from '../../store/reducers/settings.reducer';
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
  readonly TASK_VIEW_MINIMALIST = TaskView.MINIMALIST;
  readonly TASK_VIEW_INFORMATIVE = TaskView.INFORMATIVE;

  completedTasks$ = this.store.select(selectCompletedTasks);
  groupedTasks$ = this.store.select(selectTasksGroupByProjectSections);
  userPreferences$ = this.store.select(selectPreferences);

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {}

  openCreateTaskDialog(section: Section) {
    this.dialog.open(CreateTaskDialogComponent, {
      data: {
        section,
      },
    });
  }

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
