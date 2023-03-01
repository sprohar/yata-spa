import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from '../interfaces/confirmation-dialog-data';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  open(data: ConfirmationDialogData) {
    return this.dialog.open(ConfirmationDialogComponent, {
      data,
    });
  }
}
