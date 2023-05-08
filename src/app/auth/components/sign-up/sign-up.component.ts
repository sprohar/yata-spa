import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ErrorService } from '../../../services/error.service';
import { AuthActions } from '../../../store/actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'yata-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  showPassword = false;
  returnUrl = '/app';
  readonly passwordMinLength = User.Password.MinLength;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
