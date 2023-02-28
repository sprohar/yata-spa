import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { KanbanViewRoutingModule } from './kanban-view-routing.module';
import { KanbanViewComponent } from './kanban-view.component';


@NgModule({
  declarations: [
    KanbanViewComponent
  ],
  imports: [
    CommonModule,
    KanbanViewRoutingModule,
    SharedModule,
  ]
})
export class KanbanViewModule { }
