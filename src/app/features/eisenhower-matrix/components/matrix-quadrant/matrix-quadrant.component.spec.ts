import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Priority, Project, Task } from '../../../../models';
import { MatrixListData } from '../../interfaces/matrix-list-data';
import { MatrixQuadrantComponent } from './matrix-quadrant.component';

const groupedTasks = new Map<Project, Task[]>();
groupedTasks.set({ id: 1, name: 'Project 1' }, [
  { id: 1, title: 'task 1', projectId: 1 },
  { id: 2, title: 'task 2', projectId: 1 },
]);

groupedTasks.set({ id: 2, name: 'Project 2' }, [
  { id: 3, title: 'task 3', projectId: 2 },
  { id: 4, title: 'task 4', projectId: 2 },
]);

describe('MatrixQuadrantComponent', () => {
  let component: MatrixQuadrantComponent;
  let fixture: ComponentFixture<MatrixQuadrantComponent>;
  let store: MockStore;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        MatDialogModule,
        NoopAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatrixQuadrantComponent
    ],
    providers: [
        provideMockStore(),
        {
            provide: MatDialog,
            useValue: dialog,
        },
    ]
}).compileComponents();

    fixture = TestBed.createComponent(MatrixQuadrantComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.groupedTasks = groupedTasks;
    component.priority = Priority.HIGH;
    component.completedTasks = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleTaskDropped', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should NOT dispatch an event when the source is equal to the target', () => {
      const source: MatrixListData = {
        priority: Priority.HIGH,
        projectId: 1,
      };

      const target: MatrixListData = {
        priority: Priority.HIGH,
        projectId: 1,
      };

      const task: Task = { id: 1, title: 'Task 1', projectId: 1 };

      const event: CdkDragDrop<MatrixListData, MatrixListData, Task> = {
        previousContainer: {
          data: source,
        } as CdkDropList<MatrixListData>,
        container: {
          data: target,
        } as CdkDropList<MatrixListData>,
        item: {
          data: task,
        } as CdkDrag<Task>,
      } as CdkDragDrop<MatrixListData, MatrixListData, Task>;

      component.handleTaskDropped(event);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an event when the source does not equal the target', () => {
      const source: MatrixListData = {
        priority: Priority.HIGH,
        projectId: 1,
      };

      const target: MatrixListData = {
        priority: Priority.HIGH,
        projectId: 2,
      };

      const task: Task = { id: 1, title: 'Task 1', projectId: 1 };

      const event: CdkDragDrop<MatrixListData, MatrixListData, Task> = {
        previousContainer: {
          data: source,
        } as CdkDropList<MatrixListData>,
        container: {
          data: target,
        } as CdkDropList<MatrixListData>,
        item: {
          data: task,
        } as CdkDrag<Task>,
      } as CdkDragDrop<MatrixListData, MatrixListData, Task>;

      component.handleTaskDropped(event);

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
