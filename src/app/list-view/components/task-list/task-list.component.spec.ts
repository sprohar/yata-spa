import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Section, Task } from '../../../models';
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
      imports: [
        MatRippleModule,
        MatCheckboxModule,
        MatDividerModule,
        DragDropModule,
      ],
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

  describe('#handleDropped', () => {
    const task: Task = tasks[0];
    const sections: Section[] = [
      { id: 1, name: 'Section 1', projectId: 1 },
      { id: 2, name: 'Section 2', projectId: 1 },
    ];

    let cdkDragDropMock: jasmine.SpyObj<
      CdkDragDrop<Section | undefined, Section | undefined, Task>
    >;

    beforeEach(() => {
      component = fixture.componentInstance;
      component.tasks = tasks;
      fixture.detectChanges();
    });

    it('should NOT dispatch an action when "source === target"', () => {
      spyOn(store, 'dispatch');
      const source = sections[0];
      const target = sections[0];

      cdkDragDropMock = jasmine.createSpyObj(
        'CdkDragDrop',
        {},
        {
          container: {
            data: source,
          } as CdkDropList<Section>,
          previousContainer: {
            data: target,
          } as CdkDropList<Section>,
          item: {
            data: task,
          } as CdkDrag<Task>,
        }
      );

      component.handleDropped(cdkDragDropMock);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action when "source !== target"', () => {
      spyOn(store, 'dispatch');
      const source = sections[0];
      const target = sections[1];

      cdkDragDropMock = jasmine.createSpyObj(
        'CdkDragDrop',
        {},
        {
          container: {
            data: source,
          } as CdkDropList<Section>,
          previousContainer: {
            data: target,
          } as CdkDropList<Section>,
          item: {
            data: task,
          } as CdkDrag<Task>,
        }
      );

      component.handleDropped(cdkDragDropMock);

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
