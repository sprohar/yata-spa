import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TaskView } from '../../interfaces';
import { PreferencesActions } from '../../store/actions';
import { AuthState } from '../../store/reducers/auth.reducer';

import { NavbarComponent } from './navbar.component';

const authState: AuthState = {
  accessToken: '',
  user: {
    id: '1',
    email: 'user@example.com',
    preferences: {
      isDarkTheme: true,
      taskView: TaskView.MINIMALIST,
      defaultDueDateToday: true,
    },
  },
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideMockStore({
          initialState: {
            auth: authState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event to close the sidenav', () => {
    spyOn(component.toggleSidenav, 'emit');
    component.handleToggleSidenav();
    expect(component.toggleSidenav.emit).toHaveBeenCalledTimes(1);
  });

  describe('#handleToggleTheme', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it("should dispatch an action to update the user's preferred theme", () => {
      component.handleToggleTheme();
      expect(store.dispatch).toHaveBeenCalledOnceWith(
        PreferencesActions.update({
          preferences: {
            ...authState.user?.preferences,
            isDarkTheme: !authState.user?.preferences?.isDarkTheme,
          },
        })
      );
    });
  });
});
