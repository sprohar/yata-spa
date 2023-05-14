import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  selector: 'yata-delete-user-confirmation-dialog',
  templateUrl: './delete-user-confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class DeleteUserConfirmationDialogComponent implements AfterViewInit {
  readonly message = 'Delete my account';
  readonly control = new FormControl<string>('', {
    validators: [Validators.required, equals(this.message)],
    nonNullable: true,
  });

  @ViewChild('input') input?: ElementRef;

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    public dialogRef: MatDialogRef<DeleteUserConfirmationDialogComponent>
  ) {}

  ngAfterViewInit(): void {
    if (this.input) {
      this.input.nativeElement.focus();
      this.changeDetector.detectChanges();
    }
  }

  handleConfirm() {
    if (this.control.invalid) return;
    this.dialogRef.close(true);
  }
}
