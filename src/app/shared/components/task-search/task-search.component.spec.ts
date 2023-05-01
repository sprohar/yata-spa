import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Task } from '../../../models';
import { AppState } from '../../../store/app.state';
import { initialAuthState } from '../../../store/reducers/auth.reducer';
import { initialSectionsState } from '../../../store/reducers/sections.reducer';
import {
  initialTasksState,
  selectTasks,
} from '../../../store/reducers/tasks.reducer';
import { selectCurrentProjectId } from '../../../store/selectors';

import { TaskSearchComponent } from './task-search.component';

const tasks: Task[] = [
  { id: 1, title: 'Apples', projectId: 1, userId: '1' },
  { id: 2, title: 'Bananas', projectId: 1, userId: '1' },
  { id: 3, title: 'apricots', projectId: 1, userId: '1' },
  { id: 4, title: 'grapes', projectId: 1, userId: '1' },
];

const initialState: AppState = {
  auth: initialAuthState,
  // tags: initialTagsState,
  sections: initialSectionsState,
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project', userId: '1' }],
  },
  tasks: {
    ...initialTasksState,
    tasks,
  },
};

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;
  let router: jasmine.SpyObj<Router>;
  let store: MockStore;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [TaskSearchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectCurrentProjectId, value: 1 },
            { selector: selectTasks, value: tasks },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: Router,
          useValue: router,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskSearchComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#query', () => {
    it('should return a result set that matches the query', fakeAsync(() => {
      component.query.setValue('a');
      const element: HTMLElement = fixture.nativeElement;
      const inputElement: HTMLInputElement | null = element.querySelector(
        '[data-test="searchInput"]'
      );

      if (inputElement) {
        inputElement.value = 'a';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        if (component.resultSet$) {
          component.resultSet$.subscribe((results: Task[]) => {
            expect(results.length).toEqual(2);
          });
        } else {
          fail('result set is undefined');
        }
      } else {
        fail('inputElement is null');
      }
    }));
  });
});
