import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from '../store/effects';
import { authFeature } from '../store/reducers/auth.reducer';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthViewComponent } from './auth-view.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

@NgModule({
  declarations: [SignInComponent, AuthViewComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature(authFeature),
    EffectsModule.forFeature([AuthEffects]),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
  ],
})
export class AuthModule {}
