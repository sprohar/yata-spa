export class TimeStringParseError extends Error {
  constructor(message?: string) {
    super(message ? `Invalid time format: ${message}` : `Invalid time format`);
  }
}
