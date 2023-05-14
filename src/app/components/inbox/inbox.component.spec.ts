import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TaskView } from '../../interfaces';
import { Project, Section, Task } from '../../models';
import { SharedModule } from '../../shared/shared.module';
import { selectTasksGroupByProjectSections } from '../../store/selectors';
import { InboxComponent } from './inbox.component';
import { MemoizedSelector } from '@ngrx/store';
import { TasksState } from '../../store/reducers/tasks.reducer';
import { ActivatedRoute } from '@angular/router';

// const projects: Project[] = [{ id: 1, name: 'Project' }];
const sections: Section[] = [
  { id: 1, name: 'Section 1', projectId: 1 },
  { id: 2, name: 'Section 2', projectId: 1 },
  { id: 3, name: 'Section 3', projectId: 1 },
];
const tasks: Task[] = [
  { id: 1, title: 'Task 1', sectionId: 1, projectId: 1 },
  { id: 2, title: 'Task 2', sectionId: 2, projectId: 1 },
  { id: 3, title: 'Task 3', sectionId: 3, projectId: 1 },
];

describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;
  let mockSelectTasksGroupByProjectSections: MemoizedSelector<
    TasksState,
    Map<Section, Task[]>
  >;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [NoopAnimationsModule, SharedModule, MatExpansionModule, InboxComponent],
    providers: [
        provideMockStore({
            initialState: {
                auth: {
                    user: {
                        id: '1',
                        email: 'test@example.com',
                        preferences: {
                            taskView: TaskView.MINIMALIST,
                        },
                    },
                },
            },
        }),
        {
            provide: ActivatedRoute,
            useValue: {},
        },
    ]
}).compileComponents();

    fixture = TestBed.createComponent(InboxComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    mockSelectTasksGroupByProjectSections = store.overrideSelector(
      selectTasksGroupByProjectSections,
      new Map<Section, Task[]> 
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render three sections', () => {
    const group = new Map<Section, Task[]>();
    group.set(sections[0], [tasks[0]]);
    group.set(sections[1], [tasks[1]]);
    group.set(sections[2], [tasks[2]]);

    mockSelectTasksGroupByProjectSections.setResult(group);
    store.refreshState();
    fixture.detectChanges();

    const host: Element = fixture.nativeElement!;
    expect(host.querySelectorAll('[data-test-section]').length).toEqual(
      sections.length
    );
  });
});
