export class TimeStringParseError extends Error {
  constructor() {
    super('Invalid time format');
  }
}
