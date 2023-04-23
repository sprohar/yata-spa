import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../../../models';
import { CreateTaskDialogComponent } from '../../../../shared/components/create-task-dialog/create-task-dialog.component';
import { KanbanViewActions } from '../../../../store/actions';

@Component({
  selector: 'yata-kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumnComponent implements OnInit {
  @Input() section!: Section;
  @Input() tasks!: Task[];

  completedTasks?: Task[];
  pendingTasks?: Task[];
  isAddingTask = false;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (!this.section) {
      throw new Error('"section" is undefined.');
    }

    this.completedTasks = this.tasks.filter((task) => task.isCompleted);
    this.pendingTasks = this.tasks.filter((task) => !task.isCompleted);
  }

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }

  openCreateTaskDialog() {
    this.dialog.open(CreateTaskDialogComponent, {
      data: this.section,
    });
  }

  handleTaskCardDrop(event: CdkDragDrop<Section, Section, Task>) {
    const previousSection: Section = event.previousContainer.data;
    const section: Section = event.container.data;
    if (section.id === previousSection.id) {
      return;
    }

    const task: Task = event.item.data;
    this.store.dispatch(
      KanbanViewActions.moveTaskToSection({
        task: {
          id: task.id,
          projectId: task.projectId,
          sectionId: section.id,
        },
      })
    );
  }
}
