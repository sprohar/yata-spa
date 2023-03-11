import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Task } from '../../../models';
import { TaskCardActions } from '../../../store/actions/task-card.actions';

import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let store: MockStore;
  let task: Task = {
    id: 1,
    title: 'Task',
    projectId: 1,
  };

  beforeEach(async () => {
    matDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [TaskCardComponent],
      imports: [
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatRippleModule,
        ReactiveFormsModule,
        MatDialogModule,
      ],
      providers: [
        provideMockStore(),
        {
          provide: MatDialog,
          useValue: matDialog,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.task = task;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      spyOn(store, 'dispatch');

      component.handleViewTask();

      expect(store.dispatch).toHaveBeenCalledWith(
        TaskCardActions.viewTaskDetails({
          taskId: task.id!,
        })
      );
    });
  });
});
