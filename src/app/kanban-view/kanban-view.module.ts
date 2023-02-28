import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { KanbanViewRoutingModule } from './kanban-view-routing.module';
import { KanbanViewComponent } from './kanban-view.component';


@NgModule({
  declarations: [
    KanbanViewComponent,
    KanbanColumnComponent,
  ],
  imports: [
    CommonModule,
    KanbanViewRoutingModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
  ]
})
export class KanbanViewModule { }
