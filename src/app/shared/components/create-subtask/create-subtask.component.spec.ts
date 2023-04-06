import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Priority, Subtask, Task } from '../../../models';
import { TaskDetailsActions } from '../../../store/actions';
import { AppState } from '../../../store/app.state';
import { initialAuthState } from '../../../store/reducers/auth.reducer';
import { initialSectionsState } from '../../../store/reducers/sections.reducer';

import { CreateSubtaskComponent } from './create-subtask.component';

const subtaskCollection: Subtask[] = [
  {
    id: 1,
    title: 'Subtask',
    taskId: 1,
    completed: false,
  },
];

const taskCollection: Task[] = [
  {
    id: 1,
    title: 'Task',
    projectId: 1,
    subtasks: subtaskCollection,
  },
];

const initialState: AppState = {
  auth: initialAuthState,
  sections: initialSectionsState,
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project' }],
  },
  tasks: {
    orderBy: null,
    currentTaskId: 1,
    tasks: taskCollection,
  },
};

describe('CreateSubtaskComponent', () => {
  let component: CreateSubtaskComponent;
  let fixture: ComponentFixture<CreateSubtaskComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubtaskComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSubtaskComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.task = taskCollection[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handlePriorityChanage', () => {
    it('should update the "priority" value in the form', () => {
      const priority = Priority.HIGH;
      component.handlePriorityChange(priority);
      expect(component.priorityControl.value).toBe(priority);
    });
  });

  describe('#handleCancel', () => {
    it('should emit the "cancel" event', () => {
      spyOn(component.cancel, 'emit');
      component.handleCancel();
      expect(component.cancel.emit).toHaveBeenCalled();
    });
  });

  describe('#handleSave', () => {
    it('should NOT dispatch an action when the form is invalid', () => {
      spyOn(store, 'dispatch');

      component.form
        .get('title')
        ?.setValue(' '.repeat(Task.Title.MaxLength + 1));

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action to create a new Subtask', () => {
      spyOn(store, 'dispatch');

      const subtask: Subtask = {
        title: 'Subtask',
        taskId: 1,
        completed: false,
        priority: Priority.NONE,
      };

      component.form.patchValue({
        title: subtask.title,
      });

      component.handleSave();

      expect(store.dispatch).toHaveBeenCalledWith(
        TaskDetailsActions.createSubtask({
          subtask,
        })
      );
    });
  });
});
