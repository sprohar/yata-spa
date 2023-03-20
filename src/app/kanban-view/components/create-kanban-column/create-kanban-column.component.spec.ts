import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Section } from 'src/app/models';
import { KanbanViewActions } from '../../../store/actions';
import { AppState } from '../../../store/app.state';
import { initialAuthState } from '../../../store/reducers/auth.reducer';
import { initialSectionsState } from '../../../store/reducers/sections.reducer';
import { initialTasksState } from '../../../store/reducers/tasks.reducer';

import { CreateKanbanColumnComponent } from './create-kanban-column.component';

const initialState: AppState = {
  auth: initialAuthState,
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project' }],
  },
  sections: initialSectionsState,
  tasks: initialTasksState,
};

describe('CreateKanbanColumnComponent', () => {
  let component: CreateKanbanColumnComponent;
  let fixture: ComponentFixture<CreateKanbanColumnComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateKanbanColumnComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateKanbanColumnComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleCancel', () => {
    it('should emit the "close" event', () => {
      spyOn(component.close, 'emit');
      component.handleCancel();
      expect(component.close.emit).toHaveBeenCalled();
    });
  });

  describe('#handleSave', () => {
    it('should NOT dispatch the "createSection" action when the form is invalid', () => {
      spyOn(store, 'dispatch');
      const currentProjectId = initialState.projects.currentProjectId;

      component.handleSave(currentProjectId!);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch the "createSection" action', () => {
      const projectId = initialState.projects.currentProjectId!;
      spyOn(store, 'dispatch');

      const section: Section = { name: 'Section', projectId };
      component.nameControl.setValue(section.name);
      component.handleSave(section.projectId);

      expect(store.dispatch).toHaveBeenCalledWith(
        KanbanViewActions.createSection({
          section,
        })
      );
    });
  });
});
