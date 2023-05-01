import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Priority, Tag, Task } from '../../../models';
import { AppState } from '../../../store/app.state';
import { initialAuthState } from '../../../store/reducers/auth.reducer';
import { initialTasksState } from '../../../store/reducers/tasks.reducer';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateTaskComponentActions } from '../../../store/actions';
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
  let dialog: jasmine.SpyObj<MatDialog>;
  let store: MockStore;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [CreateTaskComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatDialogModule,
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: MatDialog, useValue: dialog },
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

  describe('#handleParseInputForTags', () => {
    it('should parse the input for tags', () => {
      const input = 'This is a #tag';
      component.handleParseInputForTags(input);
      const expectedTags = new Set<Tag>();
      expectedTags.add({ name: 'tag' });
      expect(component.selectedTags.values()).toEqual(expectedTags.values());
    });

    it('should parse the input for multiple tags', () => {
      const input = 'This is a #tag and another #uniquetag';
      component.handleParseInputForTags(input);
      const expectedTags = new Set<Tag>();
      expectedTags.add({ name: 'tag' });
      expectedTags.add({ name: 'uniquetag' });
      expect(component.selectedTags.values()).toEqual(expectedTags.values());
    });
  });

  describe('#intersectOnTagName', () => {
    it('should use the existing tags to avoid creating redundant data in the database', () => {
      const selected: Tag[] = [{ name: 'Java' }, { name: 'Spring Boot' }];
      const existing: Tag[] = [
        { id: 1, name: 'TypeScript' },
        { id: 2, name: 'Java' },
      ];
      const expected: Tag[] = [
        { id: 2, name: 'Java' },
        { name: 'Spring Boot' },
      ];

      const actual = component.intersectOnTagName(
        new Set<Tag>(selected),
        new Set<Tag>(existing)
      );

      expect(actual).toEqual(expected);
    });

    it('should return the selected tags when there are no existing tags', () => {
      const selected: Tag[] = [{ name: 'Java' }, { name: 'Spring Boot' }];
      const existing: Tag[] = [];
      const expected: Tag[] = [{ name: 'Java' }, { name: 'Spring Boot' }];

      const actual = component.intersectOnTagName(
        new Set<Tag>(selected),
        new Set<Tag>(existing)
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('#openDateTimePicker', () => {
    it('should set the due date with a date value', () => {
      const dueDate = new Date();
      dialog.open.and.returnValue({
        afterClosed: () => of(dueDate),
      } as MatDialogRef<DateTimePickerDialogComponent>);

      component.openDateTimePicker();

      expect(component.dueDateControl.value).toEqual(dueDate);
    });

    it('should set the due date with null value', () => {
      dialog.open.and.returnValue({
        afterClosed: () => of(null),
      } as MatDialogRef<DateTimePickerDialogComponent>);

      component.openDateTimePicker();

      expect(component.dueDateControl.value).toBeNull();
    });
  });

  describe('#handleSubmit', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should dispatch a createTask action', () => {
      const task: Task = {
        title: 'Task',
        priority: Priority.NONE,
        projectId: 1,
        dueDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      };

      component.titleControl.setValue('Task');
      component.priorityControl.setValue(Priority.NONE);
      component.projectIdControl.setValue(1);

      component.handleSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(
        CreateTaskComponentActions.createTask({ task })
      );
    });

    it('should dispatch a createSubtask action', () => {
      const subtask: Task = {
        title: 'Subtask',
        priority: Priority.NONE,
        projectId: 1,
        parentId: 1,
        dueDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      };

      component.titleControl.setValue('Subtask');
      component.priorityControl.setValue(Priority.NONE);
      component.parentIdControl.setValue(1);
      component.projectIdControl.setValue(1);

      component.handleSubmit();

      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        CreateTaskComponentActions.createSubtask({ subtask })
      );
    });
  });
});
