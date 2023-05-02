import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { User } from '../../../../auth/models/user.model';
import { PreferencesActions } from '../../../../store/actions';
import { AppState } from '../../../../store/app.state';
import { initialAuthState } from '../../../../store/reducers/auth.reducer';
import { initialProjectsState } from '../../../../store/reducers/projects.reducer';
import { initialSectionsState } from '../../../../store/reducers/sections.reducer';
import { initialTasksState } from '../../../../store/reducers/tasks.reducer';
import { selectUserPreferences } from '../../../../store/selectors';
import { AppearanceSettingComponent } from './appearance-setting.component';

const user: User = {
  id: '1',
  email: 'testuser@example.com',
  preferences: {
    isDarkTheme: false,
  },
};

const initialState: AppState = {
  projects: initialProjectsState,
  sections: initialSectionsState,
  tasks: initialTasksState,
  auth: {
    ...initialAuthState,
    user,
  },
};

describe('AppearanceSettingComponent', () => {
  let component: AppearanceSettingComponent;
  let fixture: ComponentFixture<AppearanceSettingComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppearanceSettingComponent],
      imports: [MatCardModule, MatSlideToggleModule, ReactiveFormsModule],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppearanceSettingComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;

    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the slide toggle', async () => {
    const slideToggles = await loader.getAllHarnesses(MatSlideToggleHarness);
    expect(slideToggles.length).toEqual(1);
  });

  it('should set the preferences with the value from the store & set the control value', () => {
    store.overrideSelector(selectUserPreferences, user.preferences!);
    store.refreshState();
    fixture.detectChanges();

    expect(component.preferences).toEqual(user.preferences!);
    expect(component.control.value).toEqual(user.preferences?.isDarkTheme!);
  });

  it('should set the preferences with the value from the store (undefined)', () => {
    store.overrideSelector(selectUserPreferences, null);
    store.refreshState();
    fixture.detectChanges();

    expect(component.preferences).toBeNull();
  });

  describe('#handleChange', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should dispatch an action when the slide-toggle is clicked', async () => {
      spyOn(component, 'handleChange');

      const slideToggles = await loader.getAllHarnesses(MatSlideToggleHarness);
      const slideToggle = slideToggles.at(0);
      await slideToggle?.toggle();

      expect(component.handleChange).toHaveBeenCalled();
    });

    it('should dispatch an action', () => {
      store.overrideSelector(selectUserPreferences, { isDarkTheme: false });
      store.refreshState();
      fixture.detectChanges();

      const isDarkTheme = true;
      component.handleChange(isDarkTheme);

      expect(store.dispatch).toHaveBeenCalledWith(
        PreferencesActions.update({
          preferences: {
            ...user.preferences,
            isDarkTheme,
          },
        })
      );
    });
  });
});
