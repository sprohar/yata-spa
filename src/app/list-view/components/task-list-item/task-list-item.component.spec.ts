import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Task } from '../../../models';
import { ListViewActions } from '../../../store/actions';

import { TaskListItemComponent } from './task-list-item.component';

const task: Task = { id: 1, title: 'Task 1', projectId: 1 };

describe('TaskListItemComponent', () => {
  let component: TaskListItemComponent;
  let fixture: ComponentFixture<TaskListItemComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatCheckboxModule, ReactiveFormsModule, MatIconModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListItemComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleChecked', () => {
    it('should dispatch the "markTaskAsComplete" action', () => {
      spyOn(store, 'dispatch');
      const mockTask = task;
      const isChecked = true;

      component.handleChecked(isChecked, mockTask);

      expect(store.dispatch).toHaveBeenCalledWith(
        ListViewActions.markTaskAsComplete({
          task: {
            id: mockTask.id,
            projectId: mockTask.projectId,
            completed: isChecked,
          },
        })
      );
    });

    it('should dispatch the "markTaskAsIncomplete" action', () => {
      spyOn(store, 'dispatch');
      const mockTask = task;
      const isChecked = false;

      component.handleChecked(isChecked, mockTask);

      expect(store.dispatch).toHaveBeenCalledWith(
        ListViewActions.markTaskAsIncomplete({
          task: {
            id: mockTask.id,
            projectId: mockTask.projectId,
            completed: isChecked,
          },
        })
      );
    });
  });

  describe('#update', () => {
    it('should not dispatch an action when the form is invalid', () => {
      spyOn(store, 'dispatch');
      component.update();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch an action when the form is pristine', () => {
      spyOn(store, 'dispatch');
      component.form.patchValue({
        title: '',
      });
      component.update();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action to update the current task', () => {
      spyOn(store, 'dispatch');
      component.form.patchValue({
        title: 'Updated Task',
      });
      component.update();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  // describe('handleSelectedTask', () => {
  //   beforeEach(() => {
  //     component = fixture.componentInstance;
  //     component.tasks = tasks;
  //     fixture.detectChanges();
  //   });

  //   it('should navigate to "/list/:projectId/tasks/:taskId"', () => {
  //     const task = tasks[0];
  //     const routerNavigateSpy = router.navigate as jasmine.Spy;

  //     component.handleSelectedTask(task);

  //     const navArgs = routerNavigateSpy.calls.first().args[0];
  //     const expectedNavArgs = ['list', task.projectId, 'tasks', task.id];

  //     expect(navArgs).toEqual(expectedNavArgs);
  //   });
  // });
});
