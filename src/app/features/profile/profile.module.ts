import { NgModule } from '@angular/core';

import { DeleteUserConfirmationDialogComponent } from './components/delete-user-confirmation-dialog/delete-user-confirmation-dialog.component';
import { EditUsernameInputComponent } from './components/edit-username-input/edit-username-input.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    ProfileRoutingModule,
    DeleteUserConfirmationDialogComponent,
    ProfileComponent,
    EditUsernameInputComponent,
  ],
})
export class ProfileModule {}
