import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from '../models';
import {
  selectCurrentProject,
  selectProjectSections,
} from '../store/selectors/projects.selectors';

@Component({
  selector: 'yata-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.scss'],
})
export class KanbanViewComponent {
  currentProject$ = this.store.select(selectCurrentProject);
  sections$ = this.store.select(selectProjectSections);
  showAddKanbanColumnComponent = false;

  constructor(private store: Store) {}

  handleAddColumn(project: Project) {
    // TODO: Add a new column to the current project
    this.showAddKanbanColumnComponent = true;
  }

  handleAddKanbanColumnComponentClosed() {
    this.showAddKanbanColumnComponent = false;
  }
}
