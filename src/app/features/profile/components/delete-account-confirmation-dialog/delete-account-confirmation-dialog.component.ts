import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

function equals(value: string): ValidatorFn {
  return function (control: AbstractControl): ValidationErrors | null {
    return control.value === value
      ? null
      : {
          invalid: true,
        };
  };
}

@Component({
  selector: 'yata-delete-account-confirmation-dialog',
  templateUrl: './delete-account-confirmation-dialog.component.html',
  styleUrls: ['./delete-account-confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountConfirmationDialogComponent {
  readonly message = 'Delete my account';
  readonly control = new FormControl<string>('', {
    validators: [Validators.required, equals(this.message)],
    nonNullable: true,
  });

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountConfirmationDialogComponent>
  ) {}

  handleConfirm() {
    if (this.control.invalid) return;
    this.dialogRef.close(true);
  }
}
