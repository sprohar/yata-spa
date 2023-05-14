import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Task } from '../../../models';
import { TaskDetailsActions } from '../../../store/actions';
import { ProjectsState } from '../../../store/reducers/projects.reducer';
import { SectionsState } from '../../../store/reducers/sections.reducer';
import { TasksState } from '../../../store/reducers/tasks.reducer';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';
import { SubtaskDetailsDailogComponent } from './subtask-details-dailog.component';

const tasksState: TasksState = {
  currentTaskId: 1,
  orderBy: null,
  tasks: [
    {
      id: 1,
      title: 'Task 1',
      projectId: 1,
      isCompleted: false,
      subtasks: [{ id: 1, title: 'Subtask 1', parentId: 1, projectId: 1 }],
    },
  ],
};

const projectsState: ProjectsState = {
  currentProjectId: null,
  projects: [{ id: 1, name: 'Project 1' }],
};

const sectionsState: SectionsState = {
  currentSectionId: null,
  sections: [
    { id: 1, name: 'Section 1', projectId: 1 },
    { id: 2, name: 'Section 2', projectId: 1 },
    { id: 3, name: 'Section 3', projectId: 1 },
  ],
};

const initialState = {
  tasks: tasksState,
  projects: projectsState,
  sections: sectionsState,
};

describe('SubtaskDetailsDailogComponent', () => {
  let component: SubtaskDetailsDailogComponent;
  let fixture: ComponentFixture<SubtaskDetailsDailogComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<SubtaskDetailsDailogComponent>>;
  let store: MockStore;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, SubtaskDetailsDailogComponent],
      providers: [
        provideMockStore({
          initialState: initialState,
        }),
        {
          provide: MAT_DIALOG_DATA,
          useValue: tasksState.tasks.at(0),
        },
        {
          provide: MatDialog,
          useValue: dialog,
        },
        {
          provide: MatDialogRef,
          useValue: dialogRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubtaskDetailsDailogComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with title, priority, isCompleted, isAllDay, projectId, dueDate', () => {
    expect(component.form.contains('title')).toBeTruthy();
    expect(component.form.contains('priority')).toBeTruthy();
    expect(component.form.contains('isCompleted')).toBeTruthy();
    expect(component.form.contains('isAllDay')).toBeTruthy();
    expect(component.form.contains('projectId')).toBeTruthy();
    expect(component.form.contains('dueDate')).toBeTruthy();
  });

  describe('#removeDueDate', () => {
    it('should remove dueDate', () => {
      component.form.patchValue({ dueDate: new Date() });
      component.removeDueDate();
      expect(component.form.value.dueDate).toBeNull();
    });
  });

  describe('#openDateTimePickerDialog', () => {
    it('should open date time picker', () => {
      dialog.open.and.returnValue({
        afterClosed: () => of(new Date()),
      } as MatDialogRef<DateTimePickerDialogComponent>);

      component.openDateTimePickerDialog();
      expect(dialog.open).toHaveBeenCalled();
    });

    it('should set dueDate', () => {
      const date = new Date();

      dialog.open.and.returnValue({
        afterClosed: () => of(date),
      } as MatDialogRef<DateTimePickerDialogComponent>);

      component.openDateTimePickerDialog();
      expect(component.form.value.dueDate).toEqual(date);
    });

    it('should set dueDate to null', () => {
      dialog.open.and.returnValue({
        afterClosed: () => of(null),
      } as MatDialogRef<DateTimePickerDialogComponent>);

      component.openDateTimePickerDialog();
      expect(component.form.value.dueDate).toBeNull();
    });
  });

  describe('#handleSave', () => {
    it('should dispatch updateTask', () => {
      const spy = spyOn(store, 'dispatch');
      const subtask: Task = component.form.value;
      subtask.title = 'New Title';

      component.form.patchValue(subtask);
      component.form.markAsDirty();
      component.handleSave();

      expect(spy).toHaveBeenCalledWith(
        TaskDetailsActions.updateSubtask({ task: subtask })
      );
    });
  });
});
