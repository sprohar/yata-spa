import { ComponentFixture, TestBed } from '@angular/core/testing';

import { importProvidersFrom } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { Priority } from '../../../models';
import { TasksService } from '../../../services/http';
import { SearchDialogComponent, SearchScope } from './search-dialog.component';

const today = new Date(new Date().setHours(0, 0, 0, 0));
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const state = {
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, title: 'Project 1' }],
  },
  tasks: {
    currentTaskId: null,
    orderBy: null,
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        projectId: 1,
        priority: Priority.NONE,
        dueDate: today.toISOString(),
      },
      {
        id: 2,
        title: 'Task 2',
        projectId: 1,
        priority: Priority.LOW,
        dueDate: today.toISOString(),
      },
      {
        id: 3,
        title: 'Task 3',
        projectId: 1,
        priority: Priority.MEDIUM,
        dueDate: tomorrow.toISOString(),
      },
      {
        id: 4,
        title: 'Task 4',
        projectId: 1,
        priority: Priority.HIGH,
        dueDate: tomorrow.toISOString(),
      },
    ],
  },
};

describe('SearchDialogComponent', () => {
  let component: SearchDialogComponent;
  let fixture: ComponentFixture<SearchDialogComponent>;
  let service: jasmine.SpyObj<TasksService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<SearchDialogComponent>>;

  beforeEach(async () => {
    service = jasmine.createSpyObj<TasksService>('TasksService', ['search']);
    dialogRef = jasmine.createSpyObj<MatDialogRef<SearchDialogComponent>>(
      'MatDialogRef',
      ['close']
    );

    await TestBed.configureTestingModule({
      imports: [SearchDialogComponent, NoopAnimationsModule],
      providers: [
        provideMockStore({ initialState: state }),
        importProvidersFrom(MatDialogModule, MatNativeDateModule),
        { provide: TasksService, useValue: service },
        { provide: MatDialogRef, useValue: dialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the search input', () => {
    const input = fixture.nativeElement.querySelector('#query');
    expect(input).toBeTruthy();
  });

  it('should set the current project id value from the store', () => {
    expect(component.currentProjectId).toBe(state.projects.currentProjectId);
  });

  it('should set the tasks value from the store', (done: DoneFn) => {
    component.tasks$.subscribe((tasks) => {
      expect(tasks).toBe(state.tasks.tasks);
      done();
    });
  });

  describe('#handleInput', () => {
    describe('Project scope', () => {
      beforeEach(() => {
        component.scope.setValue(SearchScope.Project);
      });

      describe('#priority filter', () => {
        it('should filter tasks by ALL priority', (done: DoneFn) => {
          component.priority.setValue(Priority.ALL);
          component.handleInput('T');

          component.results$?.subscribe((tasks) => {
            expect(tasks.length).toEqual(state.tasks.tasks.length);
            done();
          });
        });

        it('should filter tasks by NO priority', (done: DoneFn) => {
          component.priority.setValue(Priority.NONE);
          component.handleInput('T');

          component.results$?.subscribe((tasks) => {
            expect(tasks).toEqual([state.tasks.tasks[0]]);
            done();
          });
        });

        it('should filter tasks by LOW priority', (done: DoneFn) => {
          component.priority.setValue(Priority.LOW);
          component.handleInput('T');

          component.results$?.subscribe((tasks) => {
            expect(tasks).toEqual([state.tasks.tasks[1]]);
            done();
          });
        });

        it('should filter tasks by MEDIUM priority', (done: DoneFn) => {
          component.priority.setValue(Priority.MEDIUM);
          component.handleInput('T');

          component.results$?.subscribe((tasks) => {
            expect(tasks).toEqual([state.tasks.tasks[2]]);
            done();
          });
        });

        it('should filter tasks by HIGH priority', (done: DoneFn) => {
          component.priority.setValue(Priority.HIGH);
          component.handleInput('T');

          component.results$?.subscribe((tasks) => {
            expect(tasks).toEqual([state.tasks.tasks[3]]);
            done();
          });
        });
      });

      describe('#dueDateRange filter', () => {
        it('should filter tasks within the given date range', (done: DoneFn) => {
          component.start.setValue(today);
          component.end.setValue(tomorrow);
          component.handleInput('T');

          component.results$?.subscribe((tasks) => {
            expect(tasks).toEqual(state.tasks.tasks);
            done();
          });
        });

        it('should filter tasks by start date', (done: DoneFn) => {
          component.start.setValue(today);
          component.handleInput('T');

          component.results$?.subscribe((tasks) => {
            expect(tasks.length).toEqual(state.tasks.tasks.length);
            done();
          });
        });

        it('should filter tasks by end date', (done: DoneFn) => {
          component.end.setValue(today);
          component.handleInput('T');

          component.results$?.subscribe((tasks) => {
            expect(tasks).toEqual([state.tasks.tasks[0], state.tasks.tasks[1]]);
            done();
          });
        });
      });
    });

    describe('Universal scope', () => {
      it('should call the tasks service', () => {
        component.scope.patchValue(SearchScope.Universal);
        fixture.detectChanges();

        const query = 'test';
        component.handleInput(query);

        expect(service.search).toHaveBeenCalledWith({
          query,
          priority: component.priority.value,
          start: component.start.value,
          end: component.end.value,
        });
      });
    });
  });
});
