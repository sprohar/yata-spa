import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { initialAuthState } from '../../../store/reducers/auth.reducer';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

import { MatNativeDateModule } from '@angular/material/core';
import { Priority, Tag, Task } from '../../../models';
import { TaskDetailsActions } from '../../../store/actions';
import { TaskDetailsDialogComponent } from './task-details-dialog.component';

const task: Task = {
  id: 1,
  title: 'Task',
  projectId: 1,
  priority: Priority.NONE,
  isCompleted: false,
};

const initialState: AppState = {
  auth: initialAuthState,
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project' }],
  },
  sections: {
    currentSectionId: 1,
    sections: [{ id: 1, name: 'Section', projectId: 1 }],
  },
  tasks: {
    currentTaskId: 1,
    orderBy: null,
    tasks: [task],
  },
};

describe('TaskDetailsDialogComponent', () => {
  let component: TaskDetailsDialogComponent;
  let fixture: ComponentFixture<TaskDetailsDialogComponent>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let router: jasmine.SpyObj<Router>;
  let store: MockStore;

  beforeEach(async () => {
    matDialog = jasmine.createSpyObj('MatDialog', ['open']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NoopAnimationsModule,
        TaskDetailsDialogComponent,
        MatNativeDateModule,
        MatDialogModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: route },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    TestBed.overrideComponent(TaskDetailsDialogComponent, {
      add: {
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialog, useValue: matDialog },
        ],
      },
    });

    fixture = TestBed.createComponent(TaskDetailsDialogComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#openTagsSelectListDialog', () => {
    it('should open the tags-select-list-dialog', () => {
      matDialog.open.and.returnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<DateTimePickerDialogComponent>);

      component.openTagsSelectListDialog(task);

      expect(matDialog.open).toHaveBeenCalled();
    });
  });

  describe('#openDateTimePickerDialog', () => {
    it('should dispatch updateTask action when a Date value is returned', () => {
      spyOn(store, 'dispatch');
      const dueDate = new Date();

      matDialog.open.and.returnValue({
        afterClosed: () => of(dueDate),
      } as MatDialogRef<DateTimePickerDialogComponent>);

      component.openDateTimePickerDialog();

      expect(matDialog.open).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        TaskDetailsActions.updateTask({
          task: { id: task.id, dueDate: dueDate.toISOString() },
        })
      );
    });

    it('should dispatch updateTask action when a null value is returned', () => {
      spyOn(store, 'dispatch');

      matDialog.open.and.returnValue({
        afterClosed: () => of(null),
      } as MatDialogRef<DateTimePickerDialogComponent>);

      component.openDateTimePickerDialog();

      expect(matDialog.open).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        TaskDetailsActions.updateTask({
          task: { id: task.id, dueDate: null },
        })
      );
    });

    it('should NOT dispatch updateTask action when the Cancel button is clicked', () => {
      spyOn(store, 'dispatch');

      matDialog.open.and.returnValue({
        afterClosed: () => of(''),
      } as MatDialogRef<DateTimePickerDialogComponent>);

      component.openDateTimePickerDialog();

      expect(matDialog.open).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('#handleRemoveTag', () => {
    it('should dispatch the removeTagFromTask action', () => {
      spyOn(store, 'dispatch');
      const tag: Tag = { id: 1, name: 'Tag' };

      component.handleRemoveTag(task, tag);

      expect(store.dispatch).toHaveBeenCalledWith(
        TaskDetailsActions.removeTagFromTask({
          task,
          tag,
        })
      );
    });
  });

  describe('#handleDeleteSubtask', () => {
    it('should dispatch the deleteSubtask action', () => {
      spyOn(store, 'dispatch');
      const subtask: Task = { id: 1, title: 'Subtask', projectId: 1 };

      component.handleDeleteSubtask(subtask);

      expect(store.dispatch).toHaveBeenCalledWith(
        TaskDetailsActions.deleteSubtask({ subtask })
      );
    });
  });

  describe('#handlePriorityChange', () => {
    it('should update the priority form control', () => {
      component.handlePriorityChange(Priority.HIGH);
      expect(component.form.value.priority).toBe(Priority.HIGH);
    });
  });

  describe('#handleChecked', () => {
    it('should dispatch an action to toggle the "checked" field in a Task', () => {
      spyOn(store, 'dispatch');
      component.handleChecked();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
