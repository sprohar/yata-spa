import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TimeStringParser } from '../../util/time-string-parser';

import { DateTimePickerDialogComponent } from './date-time-picker-dialog.component';

describe('DateTimePickerDialogComponent', () => {
  let component: DateTimePickerDialogComponent;
  let fixture: ComponentFixture<DateTimePickerDialogComponent>;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<DateTimePickerDialogComponent>>;

  beforeEach(async () => {
    matDialogRef = jasmine.createSpyObj('MatDialogRef', {
      close: () => {},
    });

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        DateTimePickerDialogComponent,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: null,
        },
        {
          provide: MatDialogRef,
          useValue: matDialogRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DateTimePickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with NO data input', () => {
    expect(component).toBeTruthy();
    expect(component.date).toBeNull();
  });

  describe('#onInit (with data input)', () => {
    beforeEach(() => {
      component.data = new Date();
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should create with data input', () => {
      expect(component).toBeTruthy();
      expect(component.date).not.toBeNull();
    });
  });

  describe('#hasTimeComponent', () => {
    it('should return false when the "dueDate" variable is null', () => {
      expect(component.hasTimeComponent).toBeFalse();
    });

    it('should return false when the "dueDate" variable has no time component', () => {
      const dueDate = new Date();
      dueDate.setHours(0);
      dueDate.setMinutes(0);
      dueDate.setSeconds(0);
      component.date = dueDate;
      expect(component.hasTimeComponent).toBeFalse();
    });

    it('should return true when the "dueDate" variable has a time component', () => {
      const dueDate = new Date();
      dueDate.setHours(23);
      component.date = dueDate;
      expect(component.hasTimeComponent).toBeTrue();
    });
  });

  describe('#initSuggestedDates', () => {
    it('should initialize the suggested dates', () => {
      const today = new Date();
      component.initSuggestedDates();
      expect(component.suggestedDates).toBeDefined();
      expect(component.suggestedDates.today.getDate()).toBe(today.getDate());
      expect(component.suggestedDates.tomorrow.getDate()).toBe(
        today.getDate() + 1
      );

      expect(component.suggestedDates.nextWeek.getDate()).toBe(
        today.getDate() + 7
      );
    });
  });

  describe('#openTimePicker', () => {
    it('should close', () => {
      component.openTimePicker();
      expect(component.showTimeInput).toBeTrue();
    });
  });

  describe('#isWeekend', () => {
    it('should return false when the given date is NOT a weekend', () => {
      const monday = new Date(2023, 0, 2);
      expect(component.isWeekend(monday)).toBeFalse();
    });

    it('should return true when the given date is a weekend', () => {
      const sunday = new Date(2023, 0, 1);
      const saturday = new Date(2023, 0, 7);
      expect(component.isWeekend(sunday)).toBeTrue();
      expect(component.isWeekend(saturday)).toBeTrue();
    });
  });

  describe('#isAllDay', () => {
    it('should return false when the date has a time component', () => {
      const date = new Date();
      date.setHours(12);
      expect(component.isAllDay(date)).toBeFalse();
    });

    it('should return true when the date has NO time component', () => {
      const date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      expect(component.isAllDay(date)).toBeTrue();
    });
  });

  describe('#closeTimePicker', () => {
    it('should close', () => {
      component.closeTimePicker();
      expect(component.showTimeInput).toBeFalse();
    });
  });

  describe('#clearDueDate', () => {
    it('should clear the select date value', () => {
      component.date = new Date();
      component.clearDueDate();
      expect(component.date).toBeNull();
    });
  });

  describe('#clearTime', () => {
    it('should not clear the time component of the date when a date has not been selected', () => {
      component.clearTime();
      expect(component.date).toBeNull();
    });

    it('should set the "hours", "minutes", and "seconds" to 0', () => {
      const date = new Date();
      component.date = date;
      component.clearTime();
      expect(component.date.getHours()).toBe(0);
      expect(component.date.getMinutes()).toBe(0);
      expect(component.date.getSeconds()).toBe(0);
    });
  });

  describe('#handleSelectedDate', () => {
    it('should set the date to the value that was emitted by the mat-calendar', () => {
      const selectedDate = new Date();
      component.handleSelectedDate(selectedDate);
      expect(component.date).toBe(selectedDate);
    });
  });

  describe('#handleTimeChange', () => {
    it('should set the "hours" and "minutes" for the selected "date"', () => {
      const timeTokens = TimeStringParser.parse('12:00');
      component.handleTimeChange(timeTokens);
      expect(component.date?.getHours()).toBe(timeTokens.hours);
      expect(component.date?.getMinutes()).toBe(timeTokens.minutes);
    });
  });

  describe('#handleSave', () => {
    it('should not return a value when the "dueDate" is null', () => {
      component.handleSave();
      expect(matDialogRef.close).not.toHaveBeenCalled();
    });

    it('should return the selected date back to the caller of the dialog', () => {
      const selectedDate = new Date();
      component.date = selectedDate;
      component.handleSave();
      expect(matDialogRef.close).toHaveBeenCalledWith(selectedDate);
    });
  });
});
