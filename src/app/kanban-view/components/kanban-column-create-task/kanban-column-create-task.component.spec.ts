import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Section, Task } from '../../../models';
import { DateTimePickerDialogComponent } from '../../../shared/components/date-time-picker-dialog/date-time-picker-dialog.component';
import { KanbanViewActions } from '../../../store/actions';
import { AppState } from '../../../store/app.state';
import { initialAuthState } from '../../../store/reducers/auth.reducer';
import { initialTasksState } from '../../../store/reducers/tasks.reducer';

import { KanbanColumnCreateTaskComponent } from './kanban-column-create-task.component';


const initialState: AppState = {
  auth: initialAuthState,
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project' }],
  },
  sections: {
    currentSectionId: null,
    sections: [{ id: 1, name: 'Section', projectId: 1 }],
  },
  tasks: initialTasksState,
};

describe('KanbanColumnCreateTaskComponent', () => {
  let component: KanbanColumnCreateTaskComponent;
  let fixture: ComponentFixture<KanbanColumnCreateTaskComponent>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let section: Section = initialState.sections.sections.at(0)!;
  let store: MockStore;

  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [KanbanColumnCreateTaskComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, ReactiveFormsModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: MatDialog, useValue: matDialogSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanColumnCreateTaskComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.section = section;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#openDateTimePicker', () => {
    it('should open the dialog', () => {
      matDialogSpy.open.and.returnValue({
        afterClosed: () => of(null),
      } as MatDialogRef<DateTimePickerDialogComponent>);

      component.openDateTimePicker();

      expect(matDialogSpy.open).toHaveBeenCalled();
    });
  });

  describe('#handlePriorityChange', () => {
    it('should set the form control value with the priority value', () => {
      const priority = Task.Priority.HIGH;
      component.handlePriorityChange(priority);
      expect(component.priorityControl.value).toBe(priority);
    });
  });

  describe('#handleSave', () => {
    it('should not dispatch an action when the form is invalid', () => {
      spyOn(store, 'dispatch');
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch the "createTask" action', () => {
      spyOn(store, 'dispatch');
      const task: Task = component.form.value;
      task.title = 'Updated';

      component.form.patchValue({
        title: task.title,
      });

      component.handleSave();

      expect(store.dispatch).toHaveBeenCalledWith(
        KanbanViewActions.createTask({
          task,
        })
      );
    });
  });
});
