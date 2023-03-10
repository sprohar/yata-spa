import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

import { TaskDetailsDialogComponent } from './task-details-dialog.component';

const initialState: AppState = {
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
    tasks: [{ id: 1, title: 'Task', projectId: 1 }],
  },
};

describe('TaskDetailsComponent', () => {
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
      declarations: [TaskDetailsDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDividerModule,
        MatCheckboxModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: MatDialog, useValue: matDialog },
        { provide: ActivatedRoute, useValue: route },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailsDialogComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#openDateTimePickerDialog', () => {
    it('should open the date-time-picker-dialog', () => {
      matDialog.open.and.returnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<DateTimePickerDialogComponent>);

      component.openDateTimePickerDialog();

      expect(matDialog.open).toHaveBeenCalled();
    });
  });

  describe('#handleGoBack', () => {
    it('should navigate up two levels', () => {
      const spy = router.navigate as jasmine.Spy;

      component.handleGoBack();

      const navArgs = spy.calls.first().args.at(0);

      expect(navArgs).toEqual(['../..']);
    });
  });

  describe('#handleMoveTaskToProject', () => {
    it('should dispatch an action to move the task to a different project', () => {
      spyOn(store, 'dispatch');
      const projectId = 1;
      component.handleMoveTaskToProject(projectId);
      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('#handleChecked', () => {
    it('should dispatch an action to toggle the "checked" field in a Task', () => {
      spyOn(store, 'dispatch');
      component.handleChecked();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('#handleSave', () => {
    it('should not dispatch an action when the form is invalid', () => {
      spyOn(store, 'dispatch');
      component.form.patchValue({
        title: '',
      });
      component.handleSave();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch an action when the form is prisitine', () => {
      spyOn(store, 'dispatch');
      component.handleSave();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action to update a task', () => {
      spyOn(store, 'dispatch');
      component.form.patchValue({
        title: 'Updated Task',
      });
      component.handleSave();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
