import { TimeStringParseError } from '../exceptions/time-string-parse.error';
import { TimeStringParser } from './time-string-parser';

describe('TimeStringParser', () => {
  describe('Format: H (AM|PM)', () => {
    it('should return time string tokens', () => {
      for (let hour = 1; hour <= 12; hour++) {
        const tokens = TimeStringParser.parse(`${hour} AM`);
        expect(tokens.hours).toEqual(hour);
        expect(tokens.minutes).toEqual(0);
      }
      const { hours, minutes } = TimeStringParser.parse('12:00 PM');
      expect(hours).toEqual(12);
      expect(minutes).toEqual(0);

      for (let hour = 1; hour < 12; hour++) {
        const tokens = TimeStringParser.parse(`${hour} PM`);
        expect(tokens.hours).toEqual(hour + 12);
        expect(tokens.minutes).toEqual(0);
      }
    });

    it('should throw an error for an invalid format', () => {
      const timeInput = '13 PM';
      expect(() => TimeStringParser.parse(timeInput)).toThrow(
        new TimeStringParseError(timeInput)
      );
    });
  });
});
