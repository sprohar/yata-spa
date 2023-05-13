import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentProject } from '../../store/selectors/projects.selectors';
import { selectKanbanColumns } from '../../store/selectors/tasks.selectors';

@Component({
  selector: 'yata-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanViewComponent {
  readonly currentProject$ = this.store.select(selectCurrentProject);
  readonly columns$ = this.store.select(selectKanbanColumns);
  showAddKanbanColumnComponent = false;

  constructor(private readonly store: Store) {}

  handleAddColumn() {
    this.showAddKanbanColumnComponent = true;
  }

  handleAddKanbanColumnComponentClosed() {
    this.showAddKanbanColumnComponent = false;
  }
}
