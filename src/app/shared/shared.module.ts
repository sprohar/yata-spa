import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ViewHeaderComponent } from './components/view-header/view-header.component';
import { TaskPriorityPipe } from './pipes/task-priority.pipe';

@NgModule({
  declarations: [TaskPriorityPipe, ViewHeaderComponent, CreateTaskComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [TaskPriorityPipe, ViewHeaderComponent, CreateTaskComponent],
})
export class SharedModule {}
