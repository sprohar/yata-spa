import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Section, Task } from '../models';
import { selectCurrentProject } from '../store/selectors/projects.selectors';
import { selectSectionsWithTasks } from '../store/selectors/sections.selectors';
import { selectUnsectionedTasks } from '../store/selectors/tasks.selectors';

@Component({
  selector: 'yata-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.scss'],
})
export class KanbanViewComponent {
  currentProject$ = this.store.select(selectCurrentProject);
  columns$ = this.store.select(selectSectionsWithTasks);
  unsectionedTasks$ = this.store.select(selectUnsectionedTasks);
  showAddKanbanColumnComponent = false;

  constructor(private store: Store) {}

  handleAddColumn() {
    this.showAddKanbanColumnComponent = true;
  }

  handleAddKanbanColumnComponentClosed() {
    this.showAddKanbanColumnComponent = false;
  }

  toSection(tasks: Task[]) {
    return {
      name: 'Not Sectioned',
      projectId: tasks[0].projectId,
      tasks,
    } as Section;
  }
}
