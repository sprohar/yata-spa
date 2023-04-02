import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
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

  describe('handleDropped', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should do nothing if the source and target are the same', () => {
      const event = {
        previousContainer: {
          data: {
            id: '1',
          },
        },
        container: {
          data: {
            id: '1',
          },
        },
        item: {
          data: {
            id: '1',
            projectId: '1',
          },
        },
      };

      component.handleDropped(event as CdkDragDrop<any, any>);
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch a moveTaskToSection action if the source and target are different', () => {
      const event = {
        previousContainer: {
          data: {
            id: '1',
          },
        },
        container: {
          data: {
            id: '2',
          },
        },
        item: {
          data: {
            id: '1',
            projectId: '1',
          },
        },
      };

      component.handleDropped(event as CdkDragDrop<any, any>);
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
