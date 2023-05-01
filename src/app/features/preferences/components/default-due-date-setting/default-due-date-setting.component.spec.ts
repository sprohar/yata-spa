import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';
import { AppState } from '../../../../store/app.state';
import { initialAuthState } from '../../../../store/reducers/auth.reducer';
import { initialProjectsState } from '../../../../store/reducers/projects.reducer';
import { initialSectionsState } from '../../../../store/reducers/sections.reducer';
import { initialTasksState } from '../../../../store/reducers/tasks.reducer';
import { DefaultDueDateSettingComponent } from './default-due-date-setting.component';

const initialState: AppState = {
  projects: initialProjectsState,
  sections: initialSectionsState,
  tasks: initialTasksState,
  auth: {
    ...initialAuthState,
    user: {
      id: '1',
      email: 'testuser@example.com',
      preferences: {
        isDarkTheme: true,
      },
    },
  },
};

describe('DefaultDueDateComponent', () => {
  let component: DefaultDueDateSettingComponent;
  let fixture: ComponentFixture<DefaultDueDateSettingComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultDueDateSettingComponent],
      imports: [
        MatSlideToggleModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultDueDateSettingComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
