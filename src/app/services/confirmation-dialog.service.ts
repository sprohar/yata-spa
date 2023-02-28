import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogData } from '../interfaces/confirmation-dialog-data';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  open(data: ConfirmationDialogData) {
    return this.dialog.open(ConfirmationDialogService, {
      data,
    });
  }
}
