import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Section, Task } from '../../../models';
import { KanbanViewActions } from '../../../store/actions';

@Component({
  selector: 'yata-kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
})
export class KanbanColumnComponent implements OnInit {
  @Input() section!: Section;
  completedTasks?: Task[];
  pendingTasks?: Task[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (!this.section) {
      throw new Error('"section" is undefined.');
    }

    this.completedTasks = this.section.tasks?.filter(task => task.isCompleted);
    this.pendingTasks = this.section.tasks?.filter(task => !task.isCompleted);
  }

  trackByTaskId(index: number, task: Task) {
    return task.id;
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
