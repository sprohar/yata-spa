import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../store/app.state';
import { initialAuthState } from '../store/reducers/auth.reducer';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ListViewComponent } from './list-view.component';
import { Section } from '../models';

const section: Section = { id: 1, name: 'Section', projectId: 1 };
const initialState: AppState = {
  auth: initialAuthState,
  projects: {
    currentProjectId: 1,
    projects: [{ id: 1, name: 'Project' }],
  },
  sections: {
    currentSectionId: null,
    sections: [section],
  },
  tasks: {
    orderBy: null,
    currentTaskId: null,
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
  },
};

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let store: MockStore;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ListViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatExpansionModule,
        DragDropModule,
        MatButtonModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: MatDialog,
          useValue: dialog,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListViewComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a tasks list', () => {
    const tasksList: HTMLElement = fixture.nativeElement.querySelector(
      `[data-test="section-${section.id}-tasks"]`
    );

    expect(tasksList).toBeTruthy();
    expect(tasksList.children.length).toBe(1);
  });

  it('should have a completed tasks list', () => {
    const completedTasksList: HTMLElement = fixture.nativeElement.querySelector(
      '[data-test="completedTasks"]'
    );

    expect(completedTasksList).toBeTruthy();
    expect(completedTasksList.children.length).toBe(1);
  });

  describe('#openCreateTaskDialog', () => {
    it('should open the create task dialog', () => {
      component.openCreateTaskDialog(section);
      expect(dialog.open).toHaveBeenCalled();
    });
  });
});
