import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ErrorService } from '../../../services/error.service';
import { AuthActions } from '../../../store/actions';
import { AuthDto } from '../../dto/auth.dto';
import { User } from '../../models/user.model';

@Component({
  selector: 'yata-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  showPassword = false;
  returnUrl = '/app';

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

  handleSignIn() {
    if (this.form.invalid) {
      return;
    }

    const dto = this.form.value as AuthDto;
    this.store.dispatch(
      AuthActions.signIn({
        dto,
        returnUrl: this.returnUrl,
      })
    );
  }
}
