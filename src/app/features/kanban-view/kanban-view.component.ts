import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ViewHeaderComponent } from '../../shared/components/view-header/view-header.component';
import { selectCurrentProject } from '../../store/selectors/projects.selectors';
import { selectKanbanColumns } from '../../store/selectors/tasks.selectors';
import { CreateKanbanColumnComponent } from './components/create-kanban-column/create-kanban-column.component';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';

@Component({
  selector: 'yata-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    ViewHeaderComponent,
    CdkDropListGroup,
    NgFor,
    KanbanColumnComponent,
    CreateKanbanColumnComponent,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    AsyncPipe,
    KeyValuePipe,
  ],
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
