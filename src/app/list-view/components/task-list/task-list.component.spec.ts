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
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Section, Task } from '../../../models';

import { TaskListComponent } from './task-list.component';

const tasks: Task[] = [{ id: 1, title: 'Task 1', projectId: 1 }];

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [
        MatRippleModule,
        MatCheckboxModule,
        MatDividerModule,
        DragDropModule,
      ],
      providers: [provideMockStore()],
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
