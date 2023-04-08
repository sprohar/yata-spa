import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../../models';
import { TaskOptionsActions } from '../../../store/actions/task-options.actions';
import { selectMoveToSectionsOptions } from '../../../store/selectors';
import { TaskDetailsDialogComponent } from '../task-details-dialog/task-details-dialog.component';

@Component({
  selector: 'yata-task-options',
  templateUrl: './task-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskOptionsComponent {
  @Input() task!: Task;

  sections$ = this.store.select(selectMoveToSectionsOptions);

  constructor(private store: Store, private dialog: MatDialog) {}

  trackBySectionId(_index: number, section: Section) {
    return section.id;
  }

  handleDelete() {
    this.store.dispatch(
      TaskOptionsActions.deleteTask({
        task: this.task,
      })
    );
  }

  handleDuplicate() {
    this.store.dispatch(
      TaskOptionsActions.duplicateTask({
        task: this.task,
      })
    );
  }

  handleViewTaskDetails() {
    this.store.dispatch(
      TaskOptionsActions.viewDetails({
        task: this.task,
      })
    );

    this.dialog.open(TaskDetailsDialogComponent);
  }
}
