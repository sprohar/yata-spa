import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routes';
import { AuthViewComponent } from './auth-view.component';
import { LogoComponent } from './components/logo/logo.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    SignInComponent,
    AuthViewComponent,
    SignUpComponent,
    LogoComponent,
  ],
})
export class AuthModule {}
