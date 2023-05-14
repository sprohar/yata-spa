import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { User } from '../../auth/models/user.model';
import { UserActions } from '../../store/actions';
import { selectUser } from '../../store/reducers/auth.reducer';
import { DeleteUserConfirmationDialogComponent } from './components/delete-user-confirmation-dialog/delete-user-confirmation-dialog.component';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let host: HTMLElement;
  let store: MockStore;
  const user: User = {
    id: '1',
    email: 'testuser@example.com',
    username: 'testuser',
  };

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        ProfileComponent,
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: dialog,
        },
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
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it("should dispatch an action to delete the user's account", () => {
      dialog.open.and.returnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<DeleteUserConfirmationDialogComponent>);

      const button: HTMLElement = host.querySelector('#deleteButton')!;
      button.click();

      expect(store.dispatch).toHaveBeenCalledWith(UserActions.deleteUser());
    });

    it("should NOT dispatch an action to delete the user's account", () => {
      dialog.open.and.returnValue({
        afterClosed: () => of(''),
      } as MatDialogRef<DeleteUserConfirmationDialogComponent>);

      const button: HTMLElement = host.querySelector('#deleteButton')!;
      button.click();

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
