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
    });

    it('should throw an error for an invalid format', () => {
      expect(() => TimeStringParser.parse('13 PM')).toThrow(
        new TimeStringParseError()
      );
    });
  });
});
