import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthActions } from '../../../store/actions';
import { User } from '../../models/user.model';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: (_returnUrl: string) => '/',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleSignIn', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should NOT dispatch an action when given invalid "email" input', () => {
      component.form.patchValue({
        email: 'bad@',
        password: 'password',
      });

      component.handleSignIn();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should NOT dispatch an action when the given password is too short', () => {
      component.form.patchValue({
        email: 'bad@',
        password: 'a'.repeat(User.Password.MinLength - 1),
      });

      component.handleSignIn();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action to sign a user into the application', () => {
      component.form.patchValue({
        email: 'user@test.dev',
        password: 'password',
      });

      component.handleSignIn();

      // expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledOnceWith(
        AuthActions.signIn({
          dto: component.form.value,
          returnUrl: component.returnUrl,
        })
      );
    });
  });
});
