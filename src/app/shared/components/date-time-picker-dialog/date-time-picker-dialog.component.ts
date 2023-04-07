import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuggestedDates } from '../../interfaces/suggested-dates';
import { TimeTokens } from '../../interfaces/time-tokens';

@Component({
  selector: 'yata-date-time-picker-dialog',
  templateUrl: './date-time-picker-dialog.component.html',
  styleUrls: ['./date-time-picker-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerDialogComponent implements OnInit {
  date: Date | null = null;
  showTimeInput = false;
  suggestedDates!: SuggestedDates;
  recurrenceText?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Date | null,
    public dialogRef: MatDialogRef<DateTimePickerDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.date = this.data;
    }

    this.initSuggestedDates();
  }

  get hasTimeComponent(): boolean {
    if (!this.date) {
      return false;
    }
    return this.date.getHours() != 0 || this.date.getMinutes() != 0;
  }

  initSuggestedDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const suggestedDates: SuggestedDates = {
      today,
      tomorrow,
      nextWeek,
    };

    if (!this.isWeekend(today)) {
      const todayDay = today.getDay();
      const delta = 6 - todayDay; // 6 -> Saturday
      const thisWeekend = new Date(today);
      thisWeekend.setDate(today.getDate() + delta);
      suggestedDates.thisWeekend = thisWeekend;
    }

    this.suggestedDates = suggestedDates;
  }

  isWeekend(date: Date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  isAllDay(date: Date) {
    return date.getMinutes() === 0 && date.getHours() === 0;
  }

  openTimePicker() {
    this.showTimeInput = true;
  }

  closeTimePicker() {
    this.showTimeInput = false;
  }

  clearDueDate() {
    this.date = null;
    this.dialogRef.close();
  }

  clearTime() {
    if (!this.date) {
      return;
    }

    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
  }

  handleSuggestedDateSelected(date: Date) {
    this.dialogRef.close(date);
  }

  handleSelectedDate(date: Date) {
    this.date = date;
  }

  handleTimeChange(timeTokens: TimeTokens) {
    if (!this.date) {
      this.date = new Date();
    }
    this.date.setHours(timeTokens.hours);
    this.date.setMinutes(timeTokens.minutes);
    this.date.setSeconds(0);
    this.closeTimePicker();
  }

  handleSave() {
    if (!this.date) {
      return;
    }

    if (this.isAllDay(this.date)) {
      this.date.setHours(23, 59, 59, 999);
    } else {
      this.date.setSeconds(0);
    }

    this.dialogRef.close(this.date);
  }
}
