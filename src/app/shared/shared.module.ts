import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
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
import { CreateCustomRecurrenceDialogComponent } from './components/create-custom-recurrence-dialog/create-custom-recurrence-dialog.component';
import { CreateSectionDialogComponent } from './components/create-section-dialog/create-section-dialog.component';
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DateTimePickerDialogComponent } from './components/date-time-picker-dialog/date-time-picker-dialog.component';
import { EditProjectDialogComponent } from './components/edit-project-dialog/edit-project-dialog.component';
import { EditSectionDialogComponent } from './components/edit-section-dialog/edit-section-dialog.component';
import { SectionOptionsMenuComponent } from './components/section-options-menu/section-options-menu.component';
import { SectionPickerComponent } from './components/section-picker/section-picker.component';
import { SectionComponent } from './components/section/section.component';
import { TaskDetailsDialogEntryComponent } from './components/task-details-dialog-entry/task-details-dialog-entry.component';
import { TaskDetailsDialogComponent } from './components/task-details-dialog/task-details-dialog.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskOptionsComponent } from './components/task-options/task-options.component';
import { TaskPriorityPickerComponent } from './components/task-priority-picker/task-priority-picker.component';
import { TaskComponent } from './components/task/task.component';
import { TasksOrderByOptionsComponent } from './components/tasks-order-by-options/tasks-order-by-options.component';
import { TimeInputComponent } from './components/time-input/time-input.component';
import { ViewHeaderComponent } from './components/view-header/view-header.component';
import { TaskPriorityPipe } from './pipes/task-priority.pipe';
import { SubtaskDetailsDailogComponent } from './components/subtask-details-dailog/subtask-details-dailog.component';

@NgModule({
  declarations: [
    TaskPriorityPipe,
    ViewHeaderComponent,
    EditSectionDialogComponent,
    TaskDetailsDialogComponent,
    TaskPriorityPickerComponent,
    TimeInputComponent,
    DateTimePickerDialogComponent,
    SectionOptionsMenuComponent,
    CreateSectionDialogComponent,
    SectionPickerComponent,
    TaskOptionsComponent,
    EditProjectDialogComponent,
    SectionComponent,
    TaskComponent,
    TaskListComponent,
    CreateCustomRecurrenceDialogComponent,
    TasksOrderByOptionsComponent,
    TaskDetailsDialogEntryComponent,
    CreateTaskComponent,
    CreateTaskDialogComponent,
    SubtaskDetailsDailogComponent,
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
    MatChipsModule,
    DragDropModule,
  ],
  exports: [
    TaskPriorityPipe,
    ViewHeaderComponent,
    EditSectionDialogComponent,
    TaskDetailsDialogComponent,
    TaskPriorityPickerComponent,
    SectionOptionsMenuComponent,
    TaskOptionsComponent,
    DateTimePickerDialogComponent,
    SectionComponent,
    TaskComponent,
    TaskListComponent,
    TaskDetailsDialogEntryComponent,
    CreateTaskComponent,
    CreateTaskDialogComponent,
  ],
})
export class SharedModule {}
