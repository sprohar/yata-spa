import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { initAppFactory } from './auth/init-app-factory';
import { JwtInterceptor } from './auth/interceptors/jwt-interceptor';
import { AuthenticationService } from './auth/services/authentication.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CreateProjectDialogComponent } from './components/create-project-dialog/create-project-dialog.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainComponent } from './components/main/main.component';
import {
  ProjectsEffects,
  SectionsEffects,
  SubtasksEffects,
  TasksEffects,
} from './store/effects/';
import {
  projectsReducer,
  sectionsReducer,
  tasksReducer,
} from './store/reducers/';

@NgModule({
  declarations: [
    AppComponent,
    CreateProjectDialogComponent,
    ConfirmationDialogComponent,
    LandingPageComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    StoreModule.forRoot(
      {
        projects: projectsReducer,
        sections: sectionsReducer,
        tasks: tasksReducer,
      },
      {}
    ),
    EffectsModule.forRoot([
      ProjectsEffects,
      SectionsEffects,
      TasksEffects,
      SubtasksEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      deps: [Store, AuthenticationService],
      useFactory: initAppFactory,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
