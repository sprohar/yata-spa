import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../store/actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'yata-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(User.Password.MinLength)],
      ],
    });
  }

  handleSignIn() {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(
      AuthActions.signIn({
        dto: this.form.value,
      })
    );

    this.form.reset();
  }
}
