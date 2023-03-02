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
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditSectionDialogComponent } from './components/edit-section-dialog/edit-section-dialog.component';
import { ViewHeaderComponent } from './components/view-header/view-header.component';
import { TaskPriorityPipe } from './pipes/task-priority.pipe';
import { TaskPriorityPickerComponent } from './components/task-priority-picker/task-priority-picker.component';

@NgModule({
  declarations: [
    TaskPriorityPipe,
    ViewHeaderComponent,
    CreateTaskComponent,
    EditSectionDialogComponent,
    TaskPriorityPickerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
  ],
  exports: [
    TaskPriorityPipe,
    ViewHeaderComponent,
    CreateTaskComponent,
    EditSectionDialogComponent,
    TaskPriorityPickerComponent,
  ],
})
export class SharedModule {}
