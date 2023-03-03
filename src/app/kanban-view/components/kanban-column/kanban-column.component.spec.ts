import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Section, Task } from '../../../models';
import { KanbanViewActions } from '../../../store/actions';
import { AppState } from '../../../store/app.state';
import { projectsInitialState } from '../../../store/reducers/projects.reducer';
import { initialSectionsState } from '../../../store/reducers/sections.reducer';
import { initialTasksState } from '../../../store/reducers/tasks.reducer';

import { KanbanColumnComponent } from './kanban-column.component';

const initialState: AppState = {
  projects: projectsInitialState,
  sections: initialSectionsState,
  tasks: initialTasksState,
};

class MatDialogRefStub {
  afterClosed() {
    return of(true);
  }
}

class MatDialogStub {
  open() {
    return new MatDialogRefStub();
  }
}

const task: Task = {
  id: 1,
  projectId: 1,
  title: 'Move me',
};

const sourceSection: Section = {
  id: 1,
  name: 'To-Do',
  projectId: 1,
};

describe('KanbanColumnComponent', () => {
  let component: KanbanColumnComponent;
  let fixture: ComponentFixture<KanbanColumnComponent>;
  let store: MockStore;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [KanbanColumnComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NoopAnimationsModule,
        DragDropModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: MatDialog,
          useClass: MatDialogStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanColumnComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.section = sourceSection;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleTaskCardDrop', () => {
    let cdkDragDropMock: jasmine.SpyObj<CdkDragDrop<Section, Section, Task>>;

    it('should NOT dispatch an action when the source Section equals the target Section', () => {
      spyOn(store, 'dispatch');

      const targetSection: Section = { ...sourceSection };

      cdkDragDropMock = jasmine.createSpyObj(
        'CdkDragDrop',
        {},
        {
          container: {
            data: targetSection,
          } as CdkDropList<Section>,
          previousContainer: {
            data: sourceSection,
          } as CdkDropList<Section>,
          item: {
            data: task,
          } as CdkDrag<Task>,
        }
      );

      component.handleTaskCardDrop(cdkDragDropMock);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action to update a Task', () => {
      spyOn(store, 'dispatch');

      const targetSection: Section = {
        id: 2,
        name: 'In Progress',
        projectId: 1,
      };

      cdkDragDropMock = jasmine.createSpyObj(
        'CdkDragDrop',
        {},
        {
          container: {
            data: targetSection,
          } as CdkDropList<Section>,
          previousContainer: {
            data: sourceSection,
          } as CdkDropList<Section>,
          item: {
            data: task,
          } as CdkDrag<Task>,
        }
      );

      component.handleTaskCardDrop(cdkDragDropMock);

      expect(store.dispatch).toHaveBeenCalledWith(
        KanbanViewActions.moveTaskToSection({
          task: {
            id: task.id,
            projectId: task.id,
            sectionId: targetSection.id,
          },
        })
      );
    });
  });

  describe('#handleDeleteColumn', () => {
    it('should dispatch the "deleteSection" action', () => {
      spyOn(store, 'dispatch');
      component.handleDeleteColumn();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
