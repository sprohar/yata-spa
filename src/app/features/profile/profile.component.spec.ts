import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { User } from '../../auth/models/user.model';
import { AccountActions } from '../../store/actions';
import { selectUser } from '../../store/reducers/auth.reducer';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let host: HTMLElement;
  let store: MockStore;
  const user: User = {
    id: '1',
    email: 'testuser@example.com',
    username: 'testuser',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [MatButtonModule, MatIconModule],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              user,
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    host = fixture.nativeElement!;
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the user profile', () => {
    const email: Element = host.querySelector('#email')!;
    const username: Element = host.querySelector('#username')!;

    expect(email).toBeDefined();
    expect(email.textContent).toMatch(user.email!);
    expect(username).toBeDefined();
    expect(username.textContent).toMatch(user.username!);
  });

  it('should render the avatar when the user does not have a profile picture', () => {
    const pic: Element = host.querySelector('img')!;
    expect(pic).toBeDefined();
    expect(pic.getAttribute('id')!).toEqual('avatar');
  });

  it("should render the user's profile picture", () => {
    store.overrideSelector(selectUser, {
      ...user,
      picture: 'assets/images/avatar-64px.png',
    } as User);
    store.refreshState();
    fixture.detectChanges();

    const pic: Element = host.querySelector('img')!;
    expect(pic).toBeDefined();
    expect(pic.getAttribute('id')!).toEqual('userPicture');
  });

  describe('#handleDeleteAccount', () => {
    it("should dispatch an action to delete the user's account", () => {
      spyOn(store, 'dispatch');

      const button: HTMLElement = host.querySelector('#deleteButton')!;
      button.click();

      expect(store.dispatch).toHaveBeenCalledWith(
        AccountActions.deleteAccount()
      );
    });
  });
});
