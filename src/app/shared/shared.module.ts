import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CreateSubtaskComponent } from './components/create-subtask/create-subtask.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DateTimePickerDialogComponent } from './components/date-time-picker-dialog/date-time-picker-dialog.component';
import { EditSectionDialogComponent } from './components/edit-section-dialog/edit-section-dialog.component';
import { SubtaskListItemComponent } from './components/subtask-list-item/subtask-list-item.component';
import { SubtaskListComponent } from './components/subtask-list/subtask-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskPriorityPickerComponent } from './components/task-priority-picker/task-priority-picker.component';
import { TimeInputComponent } from './components/time-input/time-input.component';
import { ViewHeaderComponent } from './components/view-header/view-header.component';
import { ClickableDirective } from './directives/clickable.directive';
import { TaskPriorityPipe } from './pipes/task-priority.pipe';

@NgModule({
  declarations: [
    TaskPriorityPipe,
    ViewHeaderComponent,
    CreateTaskComponent,
    EditSectionDialogComponent,
    TaskDetailsComponent,
    TaskPriorityPickerComponent,
    SubtaskListComponent,
    SubtaskListItemComponent,
    CreateSubtaskComponent,
    TimeInputComponent,
    DateTimePickerDialogComponent,
    ClickableDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  exports: [
    TaskPriorityPipe,
    ViewHeaderComponent,
    CreateTaskComponent,
    EditSectionDialogComponent,
    TaskDetailsComponent,
    TaskPriorityPickerComponent,
    ClickableDirective,
  ],
})
export class SharedModule {}
