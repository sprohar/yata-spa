import { Routes } from '@angular/router';
import { AuthViewComponent } from './auth-view.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthViewComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
    ],
  },
];
