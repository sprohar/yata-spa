import { TimeStringValidator } from './time-string.validator';

describe('TimeStringValidator', () => {
  describe('24-hour format', () => {
    it('should return false for an invalid zulu time string', () => {
      expect(TimeStringValidator.isZuluTimeString('1 PM')).toBeFalse();
    });

    it('should return true for a valid zulu time string', () => {
      for (let hour = 0; hour < 24; hour++) {
        expect(TimeStringValidator.isZuluTimeString(`${hour}:00`)).toBeTrue();
        expect(TimeStringValidator.isZuluTimeString(`${hour}:05`)).toBeTrue();

        for (let minute = 10; minute < 60; minute += 5) {
          expect(
            TimeStringValidator.isZuluTimeString(`${hour}:${minute}`)
          ).toBeTrue();
        }
      }
    });
  });

  describe('12-hour Format', () => {
    it('should return false for an invalid 12-hour time string', () => {
      expect(TimeStringValidator.isTwelveHourTimeString('13:00')).toBeFalse();
      expect(TimeStringValidator.isTwelveHourTimeString('12:00')).toBeFalse();
    });

    it('should return true for a valid 12-hour time string', () => {
      for (let hour = 1; hour <= 12; hour++) {
        expect(
          TimeStringValidator.isTwelveHourTimeString(`${hour}:00 AM`)
        ).toBeTrue();
        expect(
          TimeStringValidator.isTwelveHourTimeString(`${hour}:05 AM`)
        ).toBeTrue();
        expect(
          TimeStringValidator.isTwelveHourTimeString(`${hour}:00 PM`)
        ).toBeTrue();
        expect(
          TimeStringValidator.isTwelveHourTimeString(`${hour}:05 PM`)
        ).toBeTrue();

        for (let minute = 10; minute < 60; minute += 5) {
          expect(
            TimeStringValidator.isTwelveHourTimeString(`${hour}:${minute} AM`)
          ).toBeTrue();
          expect(
            TimeStringValidator.isTwelveHourTimeString(`${hour}:${minute} PM`)
          ).toBeTrue();
        }
      }
    });
  });
});
