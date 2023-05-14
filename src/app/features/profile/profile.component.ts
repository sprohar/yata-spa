import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { UserActions } from '../../store/actions';
import { selectUser } from '../../store/reducers/auth.reducer';
import { DeleteUserConfirmationDialogComponent } from './components/delete-user-confirmation-dialog/delete-user-confirmation-dialog.component';
import { EditUsernameInputComponent } from './components/edit-username-input/edit-username-input.component';

@Component({
  selector: 'yata-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    EditUsernameInputComponent,
    AsyncPipe,
  ],
})
export class ProfileComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  readonly user$ = this.store.select(selectUser);
  hideUsernameInput = true;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  handleDeleteAccount() {
    const ref = this.dialog.open(DeleteUserConfirmationDialogComponent);
    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.store.dispatch(UserActions.deleteUser());
        }
      });
  }
}
