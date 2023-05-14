import { NgModule } from '@angular/core';

import { CreateKanbanColumnComponent } from './components/create-kanban-column/create-kanban-column.component';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { KanbanViewRoutingModule } from './kanban-view-routing.module';
import { KanbanViewComponent } from './kanban-view.component';

@NgModule({
  imports: [
    KanbanViewRoutingModule,
    KanbanViewComponent,
    KanbanColumnComponent,
    CreateKanbanColumnComponent,
    TaskCardComponent,
  ],
})
export class KanbanViewModule {}
