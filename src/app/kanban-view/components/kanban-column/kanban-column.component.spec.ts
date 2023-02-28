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
import { AppState } from '../../../store/app.state';
import { projectsInitialState } from '../../../store/reducers/projects.reducer';
import { sectionsInitialState } from '../../../store/reducers/sections.reducer';
import { tasksInitialState } from '../../../store/reducers/tasks.reducer';

import { KanbanColumnComponent } from './kanban-column.component';

const initialState: AppState = {
  projects: projectsInitialState,
  sections: sectionsInitialState,
  tasks: tasksInitialState,
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
          // useValue: {
          //   open: () => ({
          //     afterClosed: () => of(true),
          //   }),
          // },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanColumnComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.section = {
      name: 'Section',
      projectId: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleDeleteColumn', () => {
    it('should dispatch the "deleteSection" action', () => {
      spyOn(store, 'dispatch');
      component.handleDeleteColumn();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
