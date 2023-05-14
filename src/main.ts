import { LayoutModule } from '@angular/cdk/layout';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom, isDevMode } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
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
      MatToolbarModule,
      MatExpansionModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatDividerModule,
      MatDialogModule,
      MatSnackBarModule,
      MatFormFieldModule,
      MatInputModule,
      MatMenuModule,
      MatSelectModule,
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
