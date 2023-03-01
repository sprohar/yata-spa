import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Task } from '../../../models';
import { CreateTaskActions } from '../../../store/actions';
import { AppState } from '../../../store/app.state';
import { initialTasksState } from '../../../store/reducers/tasks.reducer';

import { CreateTaskComponent } from './create-task.component';

const initialState: AppState = {
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
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTaskComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatMenuModule],
      providers: [provideMockStore({ initialState })],
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

  describe('#priorityChange', () => {
    it('should change priority to HIGH', () => {
      component.handleHighPriorityChange();
      expect(component.priorityControl.value).toBe(Task.Priority.HIGH);
    });

    it('should change priority to MEDIUM', () => {
      component.handleMediumPriorityChange();
      expect(component.priorityControl.value).toBe(Task.Priority.MEDIUM);
    });

    it('should change priority to LOW', () => {
      component.handleLowPriorityChange();
      expect(component.priorityControl.value).toBe(Task.Priority.LOW);
    });

    it('should change priority to NONE', () => {
      component.handleNonePriorityChange();
      expect(component.priorityControl.value).toBe(Task.Priority.NONE);
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
        CreateTaskActions.createTask({
          task,
        })
      );
    });
  });
});
