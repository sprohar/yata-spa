import { RecurrencePatternParseError } from '../error';

export interface TaskRecurrence {
  frequency: TaskRecurrence.Frequency;
  interval: number;
  count?: number;
}

export namespace TaskRecurrence {
  export const MAX_END_DATE = '9999-12-31';
  export const MAX_COUNT = Infinity;

  enum PatternKey {
    FREQ = 'FREQ',
    INTERVAL = 'INTERVAL',
    COUNT = 'COUNT',
  }

  export enum Frequency {
    ONCE = 'ONCE',
    SECONDLY = 'SECONDLY',
    MINUTELY = 'MINUTELY',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
  }

  function isValidFrequencyKey(value: string) {
    switch (value) {
      case Frequency.ONCE:
      case Frequency.SECONDLY:
      case Frequency.MINUTELY:
      case Frequency.DAILY:
      case Frequency.WEEKLY:
      case Frequency.MONTHLY:
      case Frequency.YEARLY:
        return true;
      default:
        return false;
    }
  }

  export function toPattern(recur: TaskRecurrence) {
    const freq = `${PatternKey.FREQ}=${recur.frequency}`;
    const interval = `${PatternKey.INTERVAL}=${recur.interval}`;
    const count = `${PatternKey.COUNT}=${recur.count}`;
    return `${freq};${interval};${count}`;
  }

  function parseValue(value: number) {
    const MIN_VALUE = 1;
    if (value < MIN_VALUE)
      throw new RecurrencePatternParseError(
        `value must be greater than or equal to one`
      );
    return value;
  }

  export function parse(recurrencePattern: string): TaskRecurrence {
    const tokens = recurrencePattern.split(';');
    let freq = TaskRecurrence.Frequency.ONCE;
    let interval = 1;
    let count = 1;

    for (const token of tokens) {
      const [key, value] = token.split('=');
      switch (key) {
        case PatternKey.FREQ:
          if (!isValidFrequencyKey(value))
            throw new RecurrencePatternParseError(
              `"${value}" is not a valid value for ${key}`
            );
          freq = value as TaskRecurrence.Frequency;
          break;
        case PatternKey.COUNT:
          count = parseValue(+value);
          break;
        case PatternKey.INTERVAL:
          interval = parseValue(+value);
          break;
        default:
          throw new RecurrencePatternParseError(`Invalid key: ${key}`);
      }
    }

    return { frequency: freq, interval, count };
  }
}
