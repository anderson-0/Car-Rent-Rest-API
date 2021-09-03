import { timeUnit } from "@shared/types/TimeUnit";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { IDateProvider } from "../IDateProvider";

class DayjsDateProvider implements IDateProvider {
  add(date: Date, quantity: number, unit: timeUnit) {
    const newDate = dayjs(date).add(quantity, unit);
    return newDate;
  }

  sub(date: Date, quantity: number, unit: timeUnit) {
    const newDate = dayjs(date).subtract(quantity, unit);
    return newDate;
  }

  now(): Date {
    return dayjs().toDate();
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compare(startDate: Date, endDate: Date, unit: timeUnit): number {
    const startDateUtc = this.convertToUtc(startDate);
    const endDateUtc = this.convertToUtc(endDate);
    return dayjs(endDateUtc).diff(startDateUtc, unit);
  }
}

export { DayjsDateProvider };
