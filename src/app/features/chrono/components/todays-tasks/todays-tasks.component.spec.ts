import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodaysTasksComponent } from './todays-tasks.component';
import { MatDividerModule } from '@angular/material/divider';
import { AppState } from '../../../../store/app.state';
import { initialAuthState } from '../../../../store/reducers/auth.reducer';
import { TaskView } from '../../../../interfaces';
import { initialProjectsState } from '../../../../store/reducers/projects.reducer';
import { initialSectionsState } from '../../../../store/reducers/sections.reducer';
import { initialTasksState } from '../../../../store/reducers/tasks.reducer';
import { selectUserPreferences } from '../../../../store/selectors';

const initialState: AppState = {
  projects: initialProjectsState,
  sections: initialSectionsState,
  auth: {
    ...initialAuthState,
    user: {
      id: '1',
      email: 'user@example.com',
      preferences: {
        taskView: TaskView.MINIMALIST,
      },
    },
  },
  tasks: {
    ...initialTasksState,
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        projectId: 1,
        dueDate: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Task 2',
        projectId: 1,
        dueDate: new Date().toISOString(),
      },
      {
        id: 3,
        title: 'Task 3',
        projectId: 1,
      },
    ],
  },
};

describe('TodaysTasksComponent', () => {
  let component: TodaysTasksComponent;
  let fixture: ComponentFixture<TodaysTasksComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodaysTasksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatDividerModule],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodaysTasksComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tasks using the MINIMALIST view', () => {
    store.overrideSelector(selectUserPreferences, {
      taskView: TaskView.MINIMALIST,
    });

    store.refreshState();
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const nodes: NodeListOf<HTMLElement> =
      element.querySelectorAll('[data-test-task]');

    expect(nodes.length).toEqual(2);
  });

  it('should render tasks using the INFORMATIVE view', () => {
    store.overrideSelector(selectUserPreferences, {
      taskView: TaskView.INFORMATIVE,
    });

    store.refreshState();
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const nodes: NodeListOf<HTMLElement> = element.querySelectorAll(
      '[data-test-task-informative]'
    );

    expect(nodes.length).toEqual(2);
  });
});
