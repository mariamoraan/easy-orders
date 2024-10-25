import { DateTime as LuxonDatetime } from 'luxon';

export enum DateComparison {
  'EQUAL' = 0,
  'MINOR' = -1,
  'MAYOR' = 1,
}

export class DateTime {
  constructor(private readonly datetime: LuxonDatetime) {}
  toFormat(format: string = 'yyyy LLL dd'): string {
    return this.datetime.toFormat(format);
  }
  toIso(): string | null {
    return this.datetime.toUTC().toISO();
  }
  toIsoDate(): string | null {
    return this.datetime.toISODate();
  }
  toMillis(): number {
    return this.datetime.toUTC().toMillis();
  }
  plus(days: number): DateTime {
    return new DateTime(this.datetime.plus({ days }));
  }
  year(): number {
    return this.datetime.year;
  }
  month(): number {
    return this.datetime.month;
  }
  day(): number {
    return this.datetime.day;
  }
  static fromIso(isoDate: string): DateTime {
    const luxonDate = LuxonDatetime.fromISO(isoDate);
    return new DateTime(luxonDate);
  }
  static fromNow(): DateTime {
    return new DateTime(LuxonDatetime.now());
  }
  static compare(date1: DateTime, date2: DateTime): DateComparison {
    if (date1.toMillis() < date2.toMillis()) return DateComparison.MINOR;
    if (date1.toMillis() > date2.toMillis()) return DateComparison.MAYOR;
    return DateComparison.EQUAL;
  }
  static fromMillis(millis: number): DateTime {
    const luxonDate = LuxonDatetime.fromMillis(millis);
    return new DateTime(luxonDate);
  }
}
