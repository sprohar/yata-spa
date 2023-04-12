import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Priority, Task } from '../../../models';
import { ConfirmationDialogService } from '../../../services';
import { TaskOptionsComponent } from './task-options.component';

describe('TaskOptionsComponent', () => {
  let component: TaskOptionsComponent;
  let fixture: ComponentFixture<TaskOptionsComponent>;
  let confirmationDialog: jasmine.SpyObj<ConfirmationDialogService>;
  let router: jasmine.SpyObj<Router>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let store: MockStore;
  const task: Task = {
    id: 1,
    title: 'Task 1',
    projectId: 1,
    priority: Priority.NONE,
  };

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    router = jasmine.createSpyObj('Router', ['navigate'], ['url']);
    route = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    confirmationDialog = jasmine.createSpyObj('ConfirmationDialogService', [
      'open',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TaskOptionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatDialogModule, MatMenuModule, MatButtonModule, MatIconModule],
      providers: [
        provideMockStore(),
        {
          provide: MatDialog,
          useValue: dialog,
        },
        {
          provide: ConfirmationDialogService,
          useValue: confirmationDialog,
        },
        {
          provide: Router,
          useValue: router,
        },
        {
          provide: ActivatedRoute,
          useValue: route,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskOptionsComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleDelete', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should dispatch the deleteTask action when the user confirms', () => {
      confirmationDialog.open.and.returnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<any>);

      component.handleDelete();
      expect(confirmationDialog.open).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should NOT dispatch the deleteTask action when the user does NOT confirm', () => {
      confirmationDialog.open.and.returnValue({
        afterClosed: () => of(false),
      } as MatDialogRef<any>);

      component.handleDelete();
      expect(confirmationDialog.open).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should NOT dispatch the deleteTask action when the user hits the ESC key', () => {
      confirmationDialog.open.and.returnValue({
        afterClosed: () => of(''),
      } as MatDialogRef<any>);

      component.handleDelete();
      expect(confirmationDialog.open).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('#handleDuplicate', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should dispatch the duplicateTask action', () => {
      component.handleDuplicate();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('#handleViewTaskDetails', () => {
    // beforeEach(() => {
    //   if (component.task) {
    //     component.task.parentId = undefined;
    //   }
    // });

    describe('Eisenhower Matrix', () => {
      it('should navigate to the TaskDetailsDialog', () => {
        // @ts-ignore
        Object.getOwnPropertyDescriptor(router, 'url').get.and.returnValue(
          '/app/matrix'
        );

        component.task.parentId = undefined;
        component.handleViewTaskDetails();

        expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(
          ['p', component.task.projectId, 'tasks', component.task.id],
          { relativeTo: route }
        );
      });
    });

    it('should navigate to the TaskDetailsDialog when', () => {
      // @ts-ignore
      Object.getOwnPropertyDescriptor(router, 'url').get.and.returnValue(
        '/app/list/1'
      );

      component.task.parentId = undefined;
      component.handleViewTaskDetails();

      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(
        ['tasks', component.task.id],
        { relativeTo: route }
      );
    });

    it('should navigate to the SubtaskDetailsDialog when ', () => {
      component.task.parentId = 11;
      component.handleViewTaskDetails();
      expect(dialog.open).toHaveBeenCalled();
    });
  });
});
