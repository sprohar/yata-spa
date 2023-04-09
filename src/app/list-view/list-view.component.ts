import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Section, Task } from '../models';
import { CreateTaskDialogComponent } from '../shared/components/create-task-dialog/create-task-dialog.component';
import { ListViewActions } from '../store/actions';
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

  openCreateTaskDialog(event: Event, section: Section) {
    event.stopPropagation();
    this.dialog.open(CreateTaskDialogComponent, {
      data: {
        section,
      },
    });
  }

  handleMoveTaskToSection(event: CdkDragDrop<Section, Section, Task>) {
    const source = event.previousContainer.data;
    const target = event.container.data;
    const task = event.item.data;
    if (source.id === target.id) return;

    this.store.dispatch(
      ListViewActions.moveTaskToSection({
        task: {
          id: task.id,
          projectId: task.projectId,
          sectionId: target ? target.id : null,
        },
      })
    );
  }
}
