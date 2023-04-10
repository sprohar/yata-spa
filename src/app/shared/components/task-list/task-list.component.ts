import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../../models';
import { TaskListActions } from '../../../store/actions/task-list.actions';

@Component({
  selector: 'yata-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  constructor(private store: Store) {}

  handleMoveTaskToSection(event: CdkDragDrop<Section, Section, Task>) {
    const source = event.previousContainer.data;
    const target = event.container.data;
    const task = event.item.data;

    if (source.dragDropData && target.dragDropData) {
      if (source.dragDropData.dueDate || target.dragDropData.dueDate) {
        this.store.dispatch(
          TaskListActions.moveTask({
            source,
            target,
            task: {
              id: task.id,
              projectId: task.projectId,
              dueDate: target.dragDropData.dueDate,
            },
          })
        );
      } else if (source.dragDropData.priority || target.dragDropData.priority) {
        this.store.dispatch(
          TaskListActions.moveTask({
            source,
            target,
            task: {
              id: task.id,
              projectId: task.projectId,
              priority: target.dragDropData.priority,
            },
          })
        );
      }
    } else {
      if (source.id === target.id) return;
      this.store.dispatch(
        TaskListActions.moveTask({
          source,
          target,
          task: {
            id: task.id,
            projectId: task.projectId,
            sectionId: target.id ?? null,
          },
        })
      );
    }
  }
}
