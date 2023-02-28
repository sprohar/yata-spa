import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogData } from '../../interfaces/confirmation-dialog-data';

@Component({
  selector: 'yata-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      throw new Error('No data was provided to the confirmation dialog');
    }
    if (!this.data.title) {
      throw new Error('No "title" was provided to the confirmation dialog');
    }
  }

  handleConfirm() {
    this.dialogRef.close(true);
  }
}
