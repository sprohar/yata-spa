import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Task } from '../../../models';
import { ListViewActions } from '../../../store/actions';

import { TaskListComponent } from './task-list.component';

const tasks: Task[] = [{ id: 1, title: 'Task 1', projectId: 1 }];

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [MatRippleModule, MatCheckboxModule, MatDividerModule],
      providers: [provideMockStore(), { provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    store = TestBed.inject(MockStore);
  });

  describe('#ngOnInit', () => {
    it('should throw an error when "tasks" is undefined', () => {
      expect(() => {
        component = fixture.componentInstance;
        fixture.detectChanges();
      }).toThrowError();
    });

    it('should create', () => {
      component = fixture.componentInstance;
      component.tasks = tasks;
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });

  describe('handleSelectedTask', () => {
    beforeEach(() => {
      component = fixture.componentInstance;
      component.tasks = tasks;
      fixture.detectChanges();
    });

    it('should navigate to "/list/:projectId/tasks/:taskId"', () => {
      const task = tasks[0];
      const routerNavigateSpy = router.navigate as jasmine.Spy;
      
      component.handleSelectedTask(task);

      const navArgs = routerNavigateSpy.calls.first().args[0];
      const expectedNavArgs = ['list', task.projectId, 'tasks', task.id];
      
      expect(navArgs).toEqual(expectedNavArgs);
    });
  });

  describe('#handleCheckbox', () => {
    beforeEach(() => {
      component = fixture.componentInstance;
      component.tasks = tasks;
      fixture.detectChanges();
    });

    it('should dispatch the "markTaskAsComplete" action', () => {
      spyOn(store, 'dispatch');
      const task = tasks[0];
      const isChecked = true;

      component.handleCheckbox(isChecked, task);
      
      expect(store.dispatch).toHaveBeenCalledWith(
        ListViewActions.markTaskAsComplete({
          task: {
            id: task.id,
            projectId: task.projectId,
            completed: isChecked,
          },
        })
      );
    });

    it('should dispatch the "markTaskAsIncomplete" action', () => {
      spyOn(store, 'dispatch');
      const task = tasks[0];
      const isChecked = false;

      component.handleCheckbox(isChecked, task);

      expect(store.dispatch).toHaveBeenCalledWith(
        ListViewActions.markTaskAsIncomplete({
          task: {
            id: task.id,
            projectId: task.projectId,
            completed: isChecked,
          },
        })
      );
    });
  });
});
