import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Task } from '../../../models';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  const task: Task = { id: 1, title: 'Task 1', projectId: 1 };
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatCheckboxModule, ReactiveFormsModule, MatIconModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleChecked', () => {
    it('should dispatch an action to update the isCompleted property', () => {
      spyOn(store, 'dispatch');
      component.handleChecked();
      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should dispatch an action to update the isCompleted property', () => {
      spyOn(store, 'dispatch');

      // trigger the change event on the FormControl
      component.form.patchValue({
        isCompleted: true,
      });

      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('#handleSubmit', () => {
    it('should not dispatch an action when the form is invalid', () => {
      spyOn(store, 'dispatch');
      component.handleSubmit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch an action when the form is pristine', () => {
      spyOn(store, 'dispatch');
      component.form.patchValue({
        title: '',
      });
      component.handleSubmit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action to update the current task', () => {
      spyOn(store, 'dispatch');
      component.form.patchValue({
        title: 'Updated Task',
      });
      component.handleSubmit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
