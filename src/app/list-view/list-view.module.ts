import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../shared/shared.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ListViewRoutingModule } from './list-view-routing.module';
import { ListViewComponent } from './list-view.component';

@NgModule({
  declarations: [
    ListViewComponent, 
    TaskListComponent, 
  ],
  imports: [
    CommonModule,
    ListViewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatRippleModule,
    DragDropModule,
  ],
})
export class ListViewModule {}
