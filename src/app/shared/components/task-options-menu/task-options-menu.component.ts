import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../../models';
import { TaskOptionsMenuActions } from '../../../store/actions/task-options-menu.actions';
import { selectMoveToSectionsOptions } from '../../../store/selectors';
import { TaskDetailsDialogComponent } from '../task-details-dialog/task-details-dialog.component';

@Component({
  selector: 'yata-task-options-menu',
  templateUrl: './task-options-menu.component.html',
  styleUrls: ['./task-options-menu.component.scss'],
})
export class TaskOptionsMenuComponent {
  @Input() task!: Task;
  
  sections$ = this.store.select(selectMoveToSectionsOptions);

  constructor(private store: Store, private dialog: MatDialog) {}

  trackBySectionId(index: number, section: Section) {
    return section.id;
  }

  handleDelete() {
    this.store.dispatch(
      TaskOptionsMenuActions.deleteTask({
        task: this.task,
      })
    );
  }

  handleDuplicate() {
    this.store.dispatch(
      TaskOptionsMenuActions.duplicateTask({
        task: this.task,
      })
    );
  }

  handleViewTaskDetails() {
    this.store.dispatch(TaskOptionsMenuActions.viewTaskDetails({
      taskId: this.task.id!,
    }));

    this.dialog.open(TaskDetailsDialogComponent);
  }
}
