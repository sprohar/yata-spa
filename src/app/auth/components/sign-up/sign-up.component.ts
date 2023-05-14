import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ErrorService } from '../../../services/error.service';
import { AuthActions } from '../../../store/actions';
import { User } from '../../models/user.model';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'yata-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    LogoComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    RouterLink,
    AsyncPipe,
  ],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  showPassword = false;
  returnUrl = '/app';
  readonly passwordMinLength = User.Password.MinLength;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    public readonly errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.initForm();
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl) {
      this.returnUrl = returnUrl;
    }
  }

  private initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(User.Password.MinLength)],
      ],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleSignUp() {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(
      AuthActions.signUp({
        dto: this.form.value,
        returnUrl: this.returnUrl,
      })
    );
  }
}
