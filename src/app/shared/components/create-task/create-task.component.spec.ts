import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Section, Task } from '../../../models';
import { CreateTaskComponentActions } from '../../../store/actions';
import { AppState } from '../../../store/app.state';
import { initialAuthState } from '../../../store/reducers/auth.reducer';
import { initialTasksState } from '../../../store/reducers/tasks.reducer';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

import { CreateTaskComponent } from './create-task.component';

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

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let store: MockStore;

  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [CreateTaskComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatMenuModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: MatDialog, useValue: matDialogSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTaskComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

      const projectId: number = initialState.projects.currentProjectId!;
      component.handleSave(projectId);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch the "createTask" action', () => {
      spyOn(store, 'dispatch');

      const projectId: number = initialState.projects.currentProjectId!;
      component.titleControl.setValue('Title');
      fixture.detectChanges();

      const task: Task = {
        ...component.form.value,
        projectId,
      };

      component.handleSave(projectId);

      expect(store.dispatch).toHaveBeenCalledWith(
        CreateTaskComponentActions.createTask({
          task,
        })
      );
    });
  });

  describe('#openDateTimePicker', () => {
    it('should open the dialog', () => {
      matDialogSpy.open.and.returnValue({
        afterClosed: () => of(null)
      } as MatDialogRef<DateTimePickerDialogComponent>);

      component.openDateTimePicker();

      expect(matDialogSpy.open).toHaveBeenCalled();
    });
  });

  describe('#handleSelectedSection', () => {
    it('should select the provided section', () => {
      const section: Section = initialState.sections.sections.at(0)!;
      component.handleSelectedSection(section);
      expect(component.section).toEqual(section);
      expect(component.form.get('sectionId')?.value).toBe(section.id)
    });
  });
});
