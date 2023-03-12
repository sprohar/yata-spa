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
import { CreateSectionDialogComponent } from './components/create-section-dialog/create-section-dialog.component';
import { CreateSubtaskComponent } from './components/create-subtask/create-subtask.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DateTimePickerDialogComponent } from './components/date-time-picker-dialog/date-time-picker-dialog.component';
import { EditSectionDialogComponent } from './components/edit-section-dialog/edit-section-dialog.component';
import { SectionOptionsMenuComponent } from './components/section-options-menu/section-options-menu.component';
import { SubtaskListItemComponent } from './components/subtask-list-item/subtask-list-item.component';
import { SubtaskListComponent } from './components/subtask-list/subtask-list.component';
import { TaskDetailsDialogComponent } from './components/task-details-dialog/task-details-dialog.component';
import { TaskPriorityPickerComponent } from './components/task-priority-picker/task-priority-picker.component';
import { TimeInputComponent } from './components/time-input/time-input.component';
import { ViewHeaderComponent } from './components/view-header/view-header.component';
import { ClickableDirective } from './directives/clickable.directive';
import { TaskPriorityPipe } from './pipes/task-priority.pipe';
import { SectionPickerComponent } from './components/section-picker/section-picker.component';
import { TaskOptionsMenuComponent } from './components/task-options-menu/task-options-menu.component';
import { TaskListSortOptionsComponent } from './components/task-list-sort-options/task-list-sort-options.component';

@NgModule({
  declarations: [
    TaskPriorityPipe,
    ViewHeaderComponent,
    CreateTaskComponent,
    EditSectionDialogComponent,
    TaskDetailsDialogComponent,
    TaskPriorityPickerComponent,
    SubtaskListComponent,
    SubtaskListItemComponent,
    CreateSubtaskComponent,
    TimeInputComponent,
    DateTimePickerDialogComponent,
    ClickableDirective,
    SectionOptionsMenuComponent,
    CreateSectionDialogComponent,
    SectionPickerComponent,
    TaskOptionsMenuComponent,
    TaskListSortOptionsComponent,
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
  ],
  exports: [
    TaskPriorityPipe,
    ViewHeaderComponent,
    CreateTaskComponent,
    EditSectionDialogComponent,
    TaskDetailsDialogComponent,
    TaskPriorityPickerComponent,
    ClickableDirective,
    SectionOptionsMenuComponent,
    TaskOptionsMenuComponent,
  ],
})
export class SharedModule {}
