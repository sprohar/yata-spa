import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { mockTasks, mockUser } from '../../../../__mock';
import { TodaysTasksComponent } from './todays-tasks.component';

describe('TodaysTasksComponent', () => {
  let component: TodaysTasksComponent;
  let fixture: ComponentFixture<TodaysTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysTasksComponent, NoopAnimationsModule],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              user: mockUser,
            },
            tasks: {
              tasks: mockTasks,
            },
          },
        }),
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodaysTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tasks', () => {
    const element: HTMLElement = fixture.nativeElement;
    const nodes: NodeListOf<HTMLElement> =
      element.querySelectorAll('[data-test-task]');

    expect(nodes.length).toEqual(mockTasks.length);
  });
});
