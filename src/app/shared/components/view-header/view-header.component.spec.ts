import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppComponent } from '../../../app.component';
import { ConfirmationDialogComponent } from '../../../components/confirmation-dialog/confirmation-dialog.component';
import { Project } from '../../../models';
import {
  KanbanViewActions,
  ListViewActions,
  ViewHeaderActions,
} from '../../../store/actions';
import { AppState } from '../../../store/app.state';
import { initialAuthState } from '../../../store/reducers/auth.reducer';

import { KanbanViewComponent } from '../../../features/kanban-view/kanban-view.component';
import { ListViewComponent } from '../../../features/list-view/list-view.component';
import { initialSectionsState } from '../../../store/reducers/sections.reducer';
import { initialTasksState } from '../../../store/reducers/tasks.reducer';
import { ViewHeaderComponent } from './view-header.component';

const initialState: AppState = {
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project' }],
  },
  sections: initialSectionsState,
  tasks: initialTasksState,
  auth: initialAuthState,
};

describe('ViewHeaderComponent', () => {
  let component: ViewHeaderComponent;
  let fixture: ComponentFixture<ViewHeaderComponent>;
  let store: MockStore;
  let routerSpy: jasmine.SpyObj<Router>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        ViewHeaderComponent,
        AppComponent,
        ListViewComponent,
        KanbanViewComponent,
      ],
      imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatDividerModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: routerSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialog,
          useValue: matDialogSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewHeaderComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#switchToKanbanView', () => {
    it('should dispatch the "switchToKanbanView" action and navigate to "/kanban/:projectId"', () => {
      spyOn(store, 'dispatch');
      const project = initialState.projects.projects[0];
      component.switchToKanbanView(project);

      const spy = routerSpy.navigate as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];

      expect(navArgs).toEqual(['app', 'kanban', project.id]);
      expect(store.dispatch).toHaveBeenCalledWith(
        ListViewActions.switchToKanbanView({
          project: {
            ...project,
            view: Project.View.KANBAN,
          },
        })
      );
    });
  });

  describe('#switchToListView', () => {
    it('should dispatch the "switchToListView" action and navigate to "/kanban/:projectId"', () => {
      spyOn(store, 'dispatch');
      const project = initialState.projects.projects[0];
      component.switchToListView(project);

      const spy = routerSpy.navigate as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];

      expect(navArgs).toEqual(['app', 'list', project.id]);
      expect(store.dispatch).toHaveBeenCalledWith(
        KanbanViewActions.switchToListView({
          project: {
            ...project,
            view: Project.View.LIST,
          },
        })
      );
    });
  });

  describe('#openDeleteProjectConfirmationDialog', () => {
    it('should NOT dispatch an action when the confirmation dialog returns "false"', () => {
      spyOn(store, 'dispatch');
      matDialogSpy.open.and.returnValue({
        afterClosed: () => of(false),
      } as MatDialogRef<ConfirmationDialogComponent>);

      const project = initialState.projects.projects[0];
      component.openDeleteProjectConfirmationDialog(project);

      expect(store.dispatch).not.toHaveBeenCalledWith(
        ViewHeaderActions.deleteProject({
          project,
        })
      );
    });

    it('should dispatch an action', () => {
      spyOn(store, 'dispatch');
      matDialogSpy.open.and.returnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<ConfirmationDialogComponent>);

      const project = initialState.projects.projects[0];
      component.openDeleteProjectConfirmationDialog(project);

      expect(store.dispatch).toHaveBeenCalledWith(
        ViewHeaderActions.deleteProject({
          project,
        })
      );
    });
  });

  describe('#openCreateSectionDialog', () => {
    it('should open the "CreateSectionDailogComponent"', () => {
      component.openCreateSectionDialog(initialState.projects.projects[0]);
      expect(matDialogSpy.open).toHaveBeenCalled();
    });
  });

  describe('#openEditProjectDialog', () => {
    it('should open the "EditProjectDailogComponent"', () => {
      component.openEditProjectDialog(initialState.projects.projects[0]);
      expect(matDialogSpy.open).toHaveBeenCalled();
    });
  });
});
