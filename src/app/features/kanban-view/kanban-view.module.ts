import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../../shared/shared.module';
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
    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
  ],
})
export class KanbanViewModule {}
