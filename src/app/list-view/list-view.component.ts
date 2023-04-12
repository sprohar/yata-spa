import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Section } from '../models';
import { CreateTaskDialogComponent } from '../shared/components/create-task-dialog/create-task-dialog.component';
import {
  selectCompletedTasks,
  selectProjectTasksGroupedBySection,
} from '../store/selectors';

@Component({
  selector: 'yata-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent {
  completedTasks$ = this.store.select(selectCompletedTasks);
  groupedTasks$ = this.store.select(selectProjectTasksGroupedBySection);

  constructor(private store: Store, private dialog: MatDialog) {}

  openCreateTaskDialog(section: Section) {
    this.dialog.open(CreateTaskDialogComponent, {
      data: {
        section,
      },
    });
  }
}
