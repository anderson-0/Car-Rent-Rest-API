import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { IDateProvider } from "../IDateProvider";

class DayjsDateProvider implements IDateProvider {
  add(
    date: Date,
    quantity: number,
    unit: "second" | "minute" | "hour" | "day" | "month" | "year"
  ) {
    const newDate = dayjs(date).add(quantity, unit);
    return newDate;
  }
  now(): Date {
    return dayjs().toDate();
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const startDateUtc = this.convertToUtc(startDate);
    const endDateUtc = this.convertToUtc(endDate);
    return dayjs(endDateUtc).diff(startDateUtc, "hours");
  }
}

export { DayjsDateProvider };
