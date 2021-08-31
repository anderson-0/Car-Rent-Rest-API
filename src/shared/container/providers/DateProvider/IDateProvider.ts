interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  convertToUtc(date: Date): string;
  now(): Date;
  add(
    date: Date,
    quantity: number,
    unit: "second" | "minute" | "hour" | "day" | "month" | "year"
  );
}

export { IDateProvider };
