import { timeUnit } from "@shared/types/TimeUnit";

interface IDateProvider {
  compare(startDate: Date, endDate: Date, unit: timeUnit): number;
  convertToUtc(date: Date): string;
  now(): Date;
  add(date: Date, quantity: number, unit: timeUnit);
  sub(date: Date, quantity: number, unit: timeUnit);
}

export { IDateProvider };
