import { AbstractControl, ValidationErrors } from '@angular/forms';

export class TimeStringValidator {
  static readonly ERROR_KEY = 'timeString';

  static isZuluTimeString(time: string): boolean {
    const regexp = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
    return regexp.test(time);
  }

  static isTwelveHourTimeString(time: string): boolean {
    const onlyHoursRegex = /^(1[0-2]|[1-9]) (AM|PM)/i; // 1 PM or 12 AM
    const regex = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/i; // 1:05 PM or 12:05 PM
    return onlyHoursRegex.test(time) || regex.test(time);
  }

  static isTimeString(time: string): boolean {
    return (
      TimeStringValidator.isTwelveHourTimeString(time) ||
      TimeStringValidator.isZuluTimeString(time)
    );
  }

  /**
   * Checks if control's value is a valid time string.
   * Valid formats include:
   *
   * - 1 PM
   * - 1 AM
   * - 12:30 AM
   * - 12:05 PM
   * - 00:30
   * - 23:55
   * @param control The `FormControl`
   * @returns `null` if the control's value is a valid time string;
   * otherwise `ValidationErrors`
   */
  static validate(control: AbstractControl): ValidationErrors | null {
    return TimeStringValidator.isTimeString(control.value)
      ? null
      : {
          timeString: {
            value: control.value,
          },
        };
  }
}
