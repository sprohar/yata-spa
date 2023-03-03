import { TimeStringParseError } from '../exceptions/time-string-parse.error';
import { TimeTokens } from '../interfaces/time-tokens';
import { TimeStringValidator } from '../validators/time-string.validator';

export class TimeStringParser {
  private static parseTwelveHourTime(time: string): TimeTokens {
    const tokens = time.split(' ');
    const tiempo = tokens[0];
    const isAM = tokens[1].toUpperCase() === 'AM';

    if (tiempo.includes(':')) {
      const [hoursToken, minutesToken] = tiempo.split(':');
      const hours = Number.parseInt(hoursToken, 10);
      const minutes = Number.parseInt(minutesToken, 10);
      return {
        hours: isAM ? hours : hours + 12,
        minutes,
      };
    }

    const hours = Number.parseInt(tiempo, 10);
    return {
      hours: isAM ? hours : hours + 12,
      minutes: 0,
    };
  }

  private static parseZuluTime(time: string): TimeTokens {
    const [hoursToken, minutesToken] = time.split(':');
    const hours = Number.parseInt(hoursToken, 10);
    const minutes = Number.parseInt(minutesToken, 10);
    return {
      hours,
      minutes,
    };
  }

  static parse(time: string): TimeTokens {
    if (TimeStringValidator.isTwelveHourTimeString(time)) {
      return TimeStringParser.parseTwelveHourTime(time);
    }
    if (TimeStringValidator.isZuluTimeString(time)) {
      return TimeStringParser.parseZuluTime(time);
    }
    throw new TimeStringParseError();
  }
}
