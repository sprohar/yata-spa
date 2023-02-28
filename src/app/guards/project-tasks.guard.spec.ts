import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NgZone } from '@angular/core';
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
import { of } from 'rxjs';
import { AppComponent } from '../app.component';
import { KanbanViewComponent } from '../kanban-view/kanban-view.component';
import { Project } from '../models';
import { SidenavActions } from '../store/actions';
import { AppState } from '../store/app.state';
import { projectTasksGuard } from './project-tasks.guard';

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
    tasks: [],
    currentTaskId: null,
  },
};

const routes: Route[] = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'kanban/:projectId',
    component: KanbanViewComponent,
    canActivate: [projectTasksGuard],
  },
];

describe('ProjectTasksGuard', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let router: Router;
  let location: Location;
  let ngZone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, KanbanViewComponent],
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
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    ngZone = TestBed.inject(NgZone);
    router.initialNavigation();
  }));

  it('should inject the Store', () => {
    expect(store).toBeDefined();
  });

  it('should dispatch the "projectSelected" action', fakeAsync(() => {
    ngZone.run(() => {
      spyOn(store, 'dispatch');
      router.navigate(['kanban', initialState.projects.currentProjectId]);
      flush();
      const currentProjectId = initialState.projects.currentProjectId;
      expect(location.path()).toEqual(`/kanban/${currentProjectId}`);
      expect(store.dispatch).toHaveBeenCalledOnceWith(
        SidenavActions.projectSelected({
          projectId: currentProjectId!,
        })
      );
    });
  }));
});
