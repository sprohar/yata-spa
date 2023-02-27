import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanViewRoutingModule } from './kanban-view-routing.module';
import { KanbanViewComponent } from './kanban-view.component';


@NgModule({
  declarations: [
    KanbanViewComponent
  ],
  imports: [
    CommonModule,
    KanbanViewRoutingModule
  ]
})
export class KanbanViewModule { }
