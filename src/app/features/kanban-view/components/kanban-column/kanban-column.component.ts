import { CdkDragDrop, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Section, Task } from '../../../../models';
import { CreateTaskDialogComponent } from '../../../../shared/components/create-task-dialog/create-task-dialog.component';
import { KanbanViewActions } from '../../../../store/actions';
import { selectCompletedTasks } from '../../../../store/selectors';
import { MatExpansionModule } from '@angular/material/expansion';
import { TaskCardComponent } from '../task-card/task-card.component';
import { SectionOptionsComponent } from '../../../../shared/components/section-options/section-options.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'yata-kanban-column',
    templateUrl: './kanban-column.component.html',
    styleUrls: ['./kanban-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, MatButtonModule, MatIconModule, SectionOptionsComponent, CdkDropList, NgFor, TaskCardComponent, CdkDrag, MatExpansionModule, AsyncPipe]
})
export class KanbanColumnComponent implements OnInit {
  @Input() section!: Section;
  @Input() tasks!: Task[];

  isAddingTask = false;

  readonly completedTasks$ = this.store
    .select(selectCompletedTasks)
    .pipe(
      map((tasks) => tasks.filter((task) => task.sectionId === this.section.id))
    );

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.section) {
      throw new Error('"section" is undefined.');
    }
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
