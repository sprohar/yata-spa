import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthViewComponent } from './auth-view.component';
import { LogoComponent } from './components/logo/logo.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { GoogleLoginButtonComponent } from './components/google-login-button/google-login-button.component';

@NgModule({
  declarations: [
    SignInComponent,
    AuthViewComponent,
    SignUpComponent,
    LogoComponent,
    GoogleLoginButtonComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
  ],
})
export class AuthModule {}
