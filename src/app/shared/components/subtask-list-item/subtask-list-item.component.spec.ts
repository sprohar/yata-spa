import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subtask, Task } from '../../../models';
import { SubtasksListItemActions } from '../../../store/actions/subtasks-list-item.actions';
import { AppState } from '../../../store/app.state';
import { initialSectionsState } from '../../../store/reducers/sections.reducer';

import { SubtaskListItemComponent } from './subtask-list-item.component';

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
  sections: initialSectionsState,
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project' }],
  },
  tasks: {
    currentTaskId: 1,
    tasks: taskCollection,
  },
};

describe('SubtaskListItemComponent', () => {
  let component: SubtaskListItemComponent;
  let fixture: ComponentFixture<SubtaskListItemComponent>;
  let store: MockStore;
  let subtask = subtaskCollection[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubtaskListItemComponent],
      imports: [
        MatCheckboxModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(SubtaskListItemComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.subtask = subtask;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleDelete', () => {
    it('should dispatch an action to delete the Subtask', () => {
      spyOn(store, 'dispatch');
      component.handleDelete();
      expect(store.dispatch).toHaveBeenCalledWith(
        SubtasksListItemActions.deleteSubtask({
          subtask,
        })
      );
    });
  });

  describe('#handleToggleCompletionStatus', () => {
    it('should NOT dispatch an action when the form is invalid', () => {
      spyOn(store, 'dispatch');

      component.form
        .get('title')
        ?.setValue(' '.repeat(Task.Title.MaxLength + 1));

      component.handleToggleCompletionStatus();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action to update the Subtask', () => {
      spyOn(store, 'dispatch');
      component.handleToggleCompletionStatus();

      const subtaskFromForm: Subtask = component.form.value;

      expect(store.dispatch).toHaveBeenCalledWith(
        SubtasksListItemActions.updateSubtask({
          subtask: {
            id: subtaskFromForm.id,
            completed: subtaskFromForm.completed,
            taskId: subtaskFromForm.taskId,
          },
        })
      );
    });
  });

  describe('#handleSave', () => {
    it('should NOT dispatch an action when the form is invalid', () => {
      spyOn(store, 'dispatch');

      component.form
        .get('title')
        ?.setValue(' '.repeat(Task.Title.MaxLength + 1));

      component.handleSave();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action to save the Subtask', () => {
      spyOn(store, 'dispatch');

      component.form.get('title')?.setValue('Updated subtask');
      component.form.markAsDirty();
      component.handleSave();
      
      expect(store.dispatch).toHaveBeenCalledWith(
        SubtasksListItemActions.updateSubtask({
          subtask: component.form.value,
        })
      );
    });
  });
});
