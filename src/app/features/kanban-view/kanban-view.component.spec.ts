import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, KanbanViewComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the columns', () => {
    const host: Element = fixture.nativeElement!;
    const columns: NodeListOf<Element> = host.querySelectorAll('[data-column]');
    expect(columns.length).toEqual(initialState.sections.sections.length);
  });

  describe('#handleAddKanbanColumnComponentClosed', () => {
    it('should set the flag to false', () => {
      component.handleAddKanbanColumnComponentClosed();
      expect(component.showAddKanbanColumnComponent).toBe(false);
    });
  });
});
