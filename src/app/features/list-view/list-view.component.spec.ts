import { CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../store/app.state';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { SectionsState } from '../../store/reducers/sections.reducer';
import { TasksState } from '../../store/reducers/tasks.reducer';
import { ListViewComponent } from './list-view.component';

const state: Partial<AppState> = {
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project' }],
  },
  sections: {
    sections: [{ id: 1, name: 'Section', projectId: 1 }],
  } as SectionsState,
  tasks: {
    tasks: [
      { id: 1, title: 'Task 1', projectId: 1, sectionId: 1, isCompleted: true },
      {
        id: 2,
        title: 'Task 2',
        projectId: 1,
        sectionId: 1,
        isCompleted: false,
      },
    ],
  } as TasksState,
};

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, ListViewComponent],
      providers: [
        provideMockStore({ initialState: state }),
        {
          provide: MatDialog,
          useValue: dialog,
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        importProvidersFrom(MatDialogModule),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a tasks list', () => {
    const element: HTMLElement = fixture.nativeElement;
    const taskLists: NodeListOf<HTMLElement> =
      element.querySelectorAll(`[data-task-list]`);

    expect(taskLists).toBeTruthy();
  });

  it('should have a completed tasks list', () => {
    const element: HTMLElement = fixture.nativeElement;
    const taskLists: NodeListOf<HTMLElement> = element.querySelectorAll(
      `[data-completed-task-list]`
    );

    expect(taskLists).toBeTruthy();
  });
});
