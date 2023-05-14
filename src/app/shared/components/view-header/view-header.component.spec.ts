import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ConfirmationDialogComponent } from '../../../components/confirmation-dialog/confirmation-dialog.component';
import { Project } from '../../../models';
import {
  KanbanViewActions,
  ListViewActions,
  ViewHeaderActions,
} from '../../../store/actions';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ViewHeaderComponent } from './view-header.component';

describe('ViewHeaderComponent', () => {
  let component: ViewHeaderComponent;
  let fixture: ComponentFixture<ViewHeaderComponent>;
  let store: MockStore;
  let routerSpy: jasmine.SpyObj<Router>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  const project: Project = { id: 1, name: 'Project' };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ViewHeaderComponent],
      providers: [
        provideMockStore({
          initialState: {
            projects: {
              currentProjectId: 1,
              projects: [project],
            },
          },
        }),
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    TestBed.overrideComponent(ViewHeaderComponent, {
      set: {
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          {
            provide: MatDialog,
            useValue: matDialogSpy,
          },
        ],
      },
    });

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
      component.openCreateSectionDialog(project);
      expect(matDialogSpy.open).toHaveBeenCalled();
    });
  });

  describe('#openEditProjectDialog', () => {
    it('should open the "EditProjectDailogComponent"', () => {
      component.openEditProjectDialog(project);
      expect(matDialogSpy.open).toHaveBeenCalled();
    });
  });
});
