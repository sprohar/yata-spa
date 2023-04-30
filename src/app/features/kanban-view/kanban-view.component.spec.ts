import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppState } from '../../store/app.state';
import { initialAuthState } from '../../store/reducers/auth.reducer';
import { KanbanViewComponent } from './kanban-view.component';

const initialState: AppState = {
  auth: initialAuthState,
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project' }],
  },
  sections: {
    currentSectionId: 1,
    sections: [{ id: 1, name: 'Section', projectId: 1 }],
  },
  tasks: {
    orderBy: null,
    currentTaskId: null,
    tasks: [{ id: 1, title: 'Task', sectionId: 1, projectId: 1 }],
  },
};

describe('KanbanViewComponent', () => {
  let component: KanbanViewComponent;
  let fixture: ComponentFixture<KanbanViewComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanbanViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatButtonModule, MatIconModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanViewComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleAddKanbanColumnComponentClosed', () => {
    it('should set the flag to false', () => {
      component.handleAddKanbanColumnComponentClosed();
      expect(component.showAddKanbanColumnComponent).toBe(false);
    });
  });
});
