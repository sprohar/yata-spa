import { DatePipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SuggestedDates } from '../../interfaces/suggested-dates';
import { TimeTokens } from '../../interfaces/time-tokens';
import { TimeInputComponent } from '../time-input/time-input.component';

@Component({
  selector: 'yata-date-time-picker-dialog',
  templateUrl: './date-time-picker-dialog.component.html',
  styleUrls: ['./date-time-picker-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    NgIf,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    TimeInputComponent,
    DatePipe,
  ],
})
export class DateTimePickerDialogComponent implements OnInit {
  date: Date | null = new Date(new Date().setHours(0, 0, 0, 0));
  showTimeInput = false;
  suggestedDates!: SuggestedDates;
  recurrenceText?: string;

  constructor(
    public readonly dialogRef: MatDialogRef<DateTimePickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date | null
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
    this.date.setHours(timeTokens.hours, timeTokens.minutes, 0, 0);
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
      this.date.setMilliseconds(0);
    }

    this.dialogRef.close(this.date);
  }
}
