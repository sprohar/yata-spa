import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
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
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appInitFactory } from './app-init-factory';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthenticationService } from './auth/services/authentication.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CreateProjectDialogComponent } from './components/create-project-dialog/create-project-dialog.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainComponent } from './components/main/main.component';
import { httpInterceptorProviders } from './http-interceptors';
import { SharedModule } from './shared/shared.module';
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
} from './store/effects/';
import {
  authReducer,
  projectsReducer,
  sectionsReducer,
  tagsReducer,
  tasksReducer,
} from './store/reducers/';

@NgModule({
  declarations: [
    AppComponent,
    CreateProjectDialogComponent,
    ConfirmationDialogComponent,
    LandingPageComponent,
    MainComponent,
    InboxComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
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
  ],
  providers: [
    httpInterceptorProviders,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { minWidth: '350px ' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' } },
    {
      provide: APP_INITIALIZER,
      deps: [Store, AuthenticationService, Router],
      useFactory: appInitFactory,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
