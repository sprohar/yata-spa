import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environment/environment';
import { OAuthActions } from '../../../store/actions/oauth.actions';
import { GoogleOAuthResponseDto } from '../../dto';

@Component({
  selector: 'yata-google-login-button',
  templateUrl: './google-login-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleLoginButtonComponent implements OnInit {
  returnUrl?: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') ?? '/app';

    // @ts-ignore
    google.accounts.id.initialize({
      client_id: environment.oauth.google.clientId,
      callback: this.handleOAuthSignIn.bind(this),
    });

    // @ts-ignore
    google.accounts.id.renderButton(document.getElementById('googleButton')!, {
      theme: 'filled_blue',
      size: 'large',
      width: '400px',
      type: 'standard',
    });
  }

  handleOAuthSignIn(dto: GoogleOAuthResponseDto) {
    this.ngZone.run(() => {
      this.store.dispatch(
        OAuthActions.signInWithGoogle({
          payload: dto,
          returnUrl: this.returnUrl ?? '/app',
        })
      );
    });
  }
}
