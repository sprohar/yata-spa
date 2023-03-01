import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';
import { CreateKanbanColumnComponent } from './components/create-kanban-column/create-kanban-column.component';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { KanbanViewRoutingModule } from './kanban-view-routing.module';
import { KanbanViewComponent } from './kanban-view.component';

@NgModule({
  declarations: [
    KanbanViewComponent,
    KanbanColumnComponent,
    CreateKanbanColumnComponent,
    TaskCardComponent,
  ],
  imports: [
    CommonModule,
    KanbanViewRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
  ],
})
export class KanbanViewModule {}
