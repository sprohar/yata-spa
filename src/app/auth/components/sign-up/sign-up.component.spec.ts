import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { User } from '../../models/user.model';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        SignUpComponent
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
    ]
}).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleSignUp', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    })

    it('should NOT dispatch an action when given invalid "email" input', () => {
      component.form.patchValue({
        email: 'bad@',
        password: 'password',
      });

      component.handleSignUp();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should NOT dispatch an action when the given password is too short', () => {
      component.form.patchValue({
        email: 'bad@',
        password: 'a'.repeat(User.Password.MinLength - 1),
      });

      component.handleSignUp();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch an action to create a new user account', () => {
      component.form.patchValue({
        email: 'user@test.dev',
        password: 'password',
      });

      component.form.markAsDirty();
      component.handleSignUp();

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
