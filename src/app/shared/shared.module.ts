import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { MatListModule } from '@angular/material/list';
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
import { SectionOptionsComponent } from './components/section-options/section-options.component';
import { SectionPickerComponent } from './components/section-picker/section-picker.component';
import { SubtaskDetailsDailogComponent } from './components/subtask-details-dailog/subtask-details-dailog.component';
import { TagsSelectListDialogComponent } from './components/tags-select-list-dialog/tags-select-list-dialog.component';
import { TaskDetailsDialogEntryComponent } from './components/task-details-dialog-entry/task-details-dialog-entry.component';
import { TaskDetailsDialogComponent } from './components/task-details-dialog/task-details-dialog.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskOptionsComponent } from './components/task-options/task-options.component';
import { TaskPriorityPickerComponent } from './components/task-priority-picker/task-priority-picker.component';
import { TaskSearchComponent } from './components/task-search/task-search.component';
import { TaskComponent } from './components/task/task.component';
import { TasksOrderByOptionsComponent } from './components/tasks-order-by-options/tasks-order-by-options.component';
import { TimeInputComponent } from './components/time-input/time-input.component';
import { ViewHeaderComponent } from './components/view-header/view-header.component';
import { TaskPriorityPipe } from './pipes/task-priority.pipe';

@NgModule({
  declarations: [
    TaskPriorityPipe,
    ViewHeaderComponent,
    EditSectionDialogComponent,
    TaskDetailsDialogComponent,
    TaskPriorityPickerComponent,
    TimeInputComponent,
    DateTimePickerDialogComponent,
    SectionOptionsComponent,
    CreateSectionDialogComponent,
    SectionPickerComponent,
    TaskOptionsComponent,
    EditProjectDialogComponent,
    TaskComponent,
    TaskListComponent,
    CreateCustomRecurrenceDialogComponent,
    TasksOrderByOptionsComponent,
    TaskDetailsDialogEntryComponent,
    CreateTaskComponent,
    CreateTaskDialogComponent,
    SubtaskDetailsDailogComponent,
    TagsSelectListDialogComponent,
    TaskSearchComponent,
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
    MatListModule,
    MatAutocompleteModule,
    A11yModule,
  ],
  exports: [
    TaskPriorityPipe,
    ViewHeaderComponent,
    EditSectionDialogComponent,
    TaskDetailsDialogComponent,
    TaskPriorityPickerComponent,
    TaskOptionsComponent,
    SectionOptionsComponent,
    DateTimePickerDialogComponent,
    TaskComponent,
    TaskListComponent,
    TaskDetailsDialogEntryComponent,
    CreateTaskComponent,
    CreateTaskDialogComponent,
    TaskSearchComponent,
  ],
})
export class SharedModule {}
