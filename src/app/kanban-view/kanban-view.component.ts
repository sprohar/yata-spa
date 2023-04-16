import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BreakpointService } from '../services/breakpoint.service';
import { selectCurrentProject } from '../store/selectors/projects.selectors';
import { selectKanbanColumns } from '../store/selectors/tasks.selectors';

@Component({
  selector: 'yata-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanViewComponent {
  currentProject$ = this.store.select(selectCurrentProject);
  columns$ = this.store.select(selectKanbanColumns);
  showAddKanbanColumnComponent = false;

  constructor(public breakpoint: BreakpointService, private store: Store) {}

  handleAddColumn() {
    this.showAddKanbanColumnComponent = true;
  }

  handleAddKanbanColumnComponentClosed() {
    this.showAddKanbanColumnComponent = false;
  }
}
