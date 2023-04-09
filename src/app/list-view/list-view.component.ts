import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Section } from '../models';
import { CreateTaskDialogComponent } from '../shared/components/create-task-dialog/create-task-dialog.component';
import { selectCompletedTasks, selectGroupedTasks } from '../store/selectors';

@Component({
  selector: 'yata-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent {
  completedTasks$ = this.store.select(selectCompletedTasks);
  groupedTasks$ = this.store.select(selectGroupedTasks);

  constructor(private store: Store, private dialog: MatDialog) {}

  openCreateTaskDialog(event: Event, section: Section) {
    event.stopPropagation();
    this.dialog.open(CreateTaskDialogComponent, {
      data: {
        section,
      },
    });
  }
}
