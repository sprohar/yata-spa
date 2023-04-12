import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Priority, Task } from '../../../models';
import { TaskCardActions } from '../../../store/actions/task-card.actions';

import { ActivatedRoute, Router } from '@angular/router';
import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  let router: jasmine.SpyObj<Router>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let store: MockStore;
  const task: Task = {
    id: 1,
    title: 'Task',
    projectId: 1,
    isCompleted: false,
    priority: Priority.HIGH,
  };

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    route = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);

    await TestBed.configureTestingModule({
      declarations: [TaskCardComponent],
      imports: [
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatRippleModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideMockStore(),
        {
          provide: Router,
          useValue: router,
        },
        {
          provide: ActivatedRoute,
          useValue: route,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    store = TestBed.inject(MockStore);

    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should have a form with the task values', () => {
    expect(component.form.value.id).toEqual(task.id);
    expect(component.form.value.projectId).toEqual(task.projectId);
    expect(component.form.value.isCompleted).toEqual(task.isCompleted);
  });

  it('should have a border color based on the task priority', () => {
    const card: HTMLElement = fixture.nativeElement.querySelector(
      `[data-test="task-${task.id}"]`
    );

    expect(card.classList).toContain('border-left-red');
  });

  describe('#handleChecked', () => {
    it('should dispatch an action to update the task', () => {
      spyOn(store, 'dispatch');

      component.handleChecked();

      expect(store.dispatch).toHaveBeenCalledWith(
        TaskCardActions.updateTask({
          task: component.form.value,
        })
      );
    });
  });

  describe('#handleViewTask', () => {
    it('should navigate to "/kanban/:projectId/tasks/:taskId"', () => {
      component.handleViewTask();

      expect(router.navigate).toHaveBeenCalledWith(['tasks', task.id], {
        relativeTo: route,
      });
    });
  });
});
