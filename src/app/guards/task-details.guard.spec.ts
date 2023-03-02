import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgZone } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Route, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from '../app.component';
import { Project } from '../models';
import { TaskDetailsComponent } from '../shared/components/task-details/task-details.component';
import { AppState } from '../store/app.state';
import { projectTasksGuard } from './project-tasks.guard';
import { taskDetailsGuard } from './task-details.guard';

const initialState: AppState = {
  projects: {
    projects: [{ id: 1, name: 'Project', view: Project.View.KANBAN }],
    currentProjectId: 1,
  },
  sections: {
    sections: [],
    currentSectionId: null,
  },
  tasks: {
    tasks: [{ id: 1, title: 'Task', projectId: 1 }],
    currentTaskId: null,
  },
};

const routes: Route[] = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'kanban/:projectId/tasks/:taskId',
    component: TaskDetailsComponent,
    canActivate: [projectTasksGuard, taskDetailsGuard],
  },
];

describe('TaskDetailsGuard', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let router: Router;
  let location: Location;
  let ngZone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, TaskDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatSidenavModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(routes),
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialog,
          useValue: {},
        },
      ],
    });

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    ngZone = TestBed.inject(NgZone);
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  }));

  it('should inject the Store', () => {
    expect(store).toBeDefined();
  });

  it('should dispatch the "projectSelected" action', fakeAsync(() => {
    ngZone.run(() => {
      spyOn(store, 'dispatch');
      const projectId = initialState.projects.currentProjectId;
      const taskId = initialState.tasks.tasks[0].id!;
      router.navigate(['kanban', projectId, 'tasks', taskId]);
      flush();

      expect(location.path()).toEqual(
        `/kanban/${projectId}/tasks/${taskId}`
      );
      expect(store.dispatch).toHaveBeenCalled();
    });
  }));
});
