import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditSectionDialogComponent } from './components/edit-section-dialog/edit-section-dialog.component';
import { ViewHeaderComponent } from './components/view-header/view-header.component';
import { TaskPriorityPipe } from './pipes/task-priority.pipe';

@NgModule({
  declarations: [
    TaskPriorityPipe,
    ViewHeaderComponent,
    CreateTaskComponent,
    EditSectionDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    TaskPriorityPipe,
    ViewHeaderComponent,
    CreateTaskComponent,
    EditSectionDialogComponent,
  ],
})
export class SharedModule {}
