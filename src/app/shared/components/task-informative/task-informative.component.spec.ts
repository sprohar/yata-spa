import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Task } from '../../../models';
import { TaskInformativeComponent } from './task-informative.component';

describe('TaskInformativeComponent', () => {
  const task: Task = { id: 1, title: 'Task 1', projectId: 1 };
  let component: TaskInformativeComponent;
  let fixture: ComponentFixture<TaskInformativeComponent>;
  let router: jasmine.SpyObj<Router>;
  let store: MockStore;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [TaskInformativeComponent],
      imports: [
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideMockStore({}),
        {
          provide: Router,
          useValue: router,
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskInformativeComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleChecked', () => {
    it('should dispatch an action to update the isCompleted property', () => {
      component.handleChecked();
      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should dispatch an action to update the isCompleted property', () => {
      // trigger the change event on the FormControl
      component.form.patchValue({
        isCompleted: true,
      });

      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('#handleSubmit', () => {
    it('should not dispatch an action when the form is invalid', () => {
      component.handleSubmit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch an action when the form is pristine', () => {
      component.form.patchValue({
        title: '',
      });
      component.handleSubmit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action to update the current task', () => {
      component.form.patchValue({
        title: 'Updated Task',
      });
      component.handleSubmit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
