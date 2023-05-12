import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
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
  let loader: HarnessLoader;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate'], {
      url: '/app/inbox',
    });

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
          provide: Router,
          useValue: router,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all autocomplete harnesses', async () => {
    const autocompletes = await loader.getAllHarnesses(MatAutocompleteHarness);
    expect(autocompletes.length).toBe(1);
  });

  it('should be able to type in an input', async () => {
    const input = await loader.getHarness(
      MatAutocompleteHarness.with({ selector: 'input' })
    );
    await input.enterText('Hello there');
    expect(await input.getValue()).toBe('Hello there');
  });

  it('should set the currentProjectId value', () => {
    expect(component.currentProjectId).toEqual(1);
  });

  describe('#handleSelectedOption', () => {
    it('should navigate to the selected option', () => {
      component.handleSelectedOption(tasks.at(0)!.id!);
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('#handleClearInput', () => {
    it('should clear input', () => {
      component.control.setValue('a');
      expect(component.control.value).toEqual('a');
      component.handleClearInput();
      expect(component.control.value).toEqual('');
    });
  });

  describe('#query', () => {
    it('should return a result set that matches the query', fakeAsync(() => {
      fixture.detectChanges();
      const element: HTMLElement = fixture.nativeElement;
      const queryInput: HTMLInputElement = element.querySelector('input')!;

      queryInput.value = 'a';
      queryInput.dispatchEvent(new Event('input'));

      tick(500); // debounceTime
      fixture.detectChanges();
      expect(component.control.value).toEqual('a');

      expect(component.resultSet$).toBeDefined();
    }));
  });
});
