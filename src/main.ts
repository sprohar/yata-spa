import { LayoutModule } from '@angular/cdk/layout';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom, isDevMode } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appInitFactory } from './app/app-init-factory';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { AuthModule } from './app/auth/auth.module';
import { AuthenticationService } from './app/auth/services/authentication.service';
import {
  AppEffects,
  AuthEffects,
  ChronoEffects,
  PreferencesEffects,
  ProjectsEffects,
  SectionsEffects,
  TagsEffects,
  TasksEffects,
  UsersEffects,
} from './app/store/effects';
import {
  authReducer,
  projectsReducer,
  sectionsReducer,
  tagsReducer,
  tasksReducer,
} from './app/store/reducers';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      ReactiveFormsModule,
      AuthModule,
      AppRoutingModule,
      StoreModule.forRoot(
        {
          auth: authReducer,
          projects: projectsReducer,
          sections: sectionsReducer,
          tasks: tasksReducer,
          tags: tagsReducer,
        },
        {}
      ),
      EffectsModule.forRoot([
        AppEffects,
        AuthEffects,
        ChronoEffects,
        ProjectsEffects,
        SectionsEffects,
        TasksEffects,
        TagsEffects,
        PreferencesEffects,
        UsersEffects,
      ]),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
      LayoutModule,
      MatSnackBarModule,
      MatDialogModule,
      MatNativeDateModule
    ),
    // httpInterceptorProviders,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { minWidth: '350px ' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' } },
    {
      provide: APP_INITIALIZER,
      deps: [Store, AuthenticationService, Router],
      useFactory: appInitFactory,
      multi: true,
    },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => {
  console.error(err);
});
