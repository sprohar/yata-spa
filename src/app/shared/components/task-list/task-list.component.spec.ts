import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Priority, Section, Task } from '../../../models';
import { TaskListActions } from '../../../store/actions/task-list.actions';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [DragDropModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleMoveTaskToSection', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should do nothing if the source and target are the same', () => {
      const event = {
        previousContainer: {
          data: {
            id: 1,
            name: 'Section 1',
            projectId: 1,
          },
        } as CdkDropList<Section>,
        container: {
          data: {
            id: 1,
            name: 'Section 1',
            projectId: 1,
          },
        } as CdkDropList<Section>,
        item: {
          data: {
            id: 1,
            title: 'Task 1',
            projectId: 1,
            isCompleted: false,
            priority: Priority.LOW,
          },
        } as CdkDrag<Task>,
      } as CdkDragDrop<Section, Section, Task>;

      component.handleMoveTaskToSection(event);
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch a moveTaskToSection action if the source and target are different', () => {
      const source: Section = {
        id: 1,
        name: 'Section 1',
        projectId: 1,
      };

      const target: Section = {
        id: 2,
        name: 'Section 2',
        projectId: 1,
      };

      const event = {
        previousContainer: {
          data: source,
        } as CdkDropList<Section>,
        container: {
          data: target,
        } as CdkDropList<Section>,
        item: {
          data: {
            id: 1,
            title: 'Task 1',
            projectId: 1,
            isCompleted: false,
            priority: Priority.LOW,
          },
        } as CdkDrag<Task>,
      } as CdkDragDrop<Section, Section, Task>;

      component.handleMoveTaskToSection(event);
      expect(store.dispatch).toHaveBeenCalledWith(
        TaskListActions.moveTask({
          source,
          target,
          task: {
            id: 1,
            projectId: 1,
            sectionId: target.id,
          },
        })
      );
    });

    it('should dispatch a moveTaskToSection action if the source and target are different and the target is a date section', () => {
      const source: Section = {
        name: 'Section 1',
        projectId: 1,
        dragDropData: {
          dueDate: '2021-01-01',
        },
      };

      const target: Section = {
        name: 'Section 2',
        projectId: 1,
        dragDropData: {
          dueDate: '2021-01-02',
        },
      };

      const task: Task = {
        id: 1,
        title: 'Task 1',
        projectId: 1,
        isCompleted: false,
        priority: Priority.LOW,
      };

      const event = {
        previousContainer: {
          data: source,
        } as CdkDropList<Section>,
        container: {
          data: target,
        } as CdkDropList<Section>,
        item: {
          data: task,
        } as CdkDrag<Task>,
      } as CdkDragDrop<Section, Section, Task>;

      component.handleMoveTaskToSection(event);
      expect(store.dispatch).toHaveBeenCalledWith(
        TaskListActions.moveTask({
          source,
          target,
          task: {
            id: task.id,
            projectId: task.projectId,
            dueDate: target.dragDropData?.dueDate,
          },
        })
      );
    });

    it('should dispatch a moveTaskToSection action if the source and target are different and the target is a priority section', () => {
      const source: Section = {
        name: 'Section 1',
        projectId: 1,
        dragDropData: {
          priority: Priority.LOW,
        },
      };

      const target: Section = {
        name: 'Section 2',
        projectId: 1,
        dragDropData: {
          priority: Priority.MEDIUM,
        },
      };

      const task: Task = {
        id: 1,
        title: 'Task 1',
        projectId: 1,
        isCompleted: false,
        priority: Priority.LOW,
      };

      const event = {
        previousContainer: {
          data: source,
        } as CdkDropList<Section>,
        container: {
          data: target,
        } as CdkDropList<Section>,
        item: {
          data: task,
        } as CdkDrag<Task>,
      } as CdkDragDrop<Section, Section, Task>;

      component.handleMoveTaskToSection(event);
      expect(store.dispatch).toHaveBeenCalledWith(
        TaskListActions.moveTask({
          source,
          target,
          task: {
            id: task.id,
            projectId: task.projectId,
            priority: target.dragDropData?.priority,
          },
        })
      );
    });
  });
});
