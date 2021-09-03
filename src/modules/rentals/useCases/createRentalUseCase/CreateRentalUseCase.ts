import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { AppError } from "@shared/errors/AppError";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

dayjs.extend(utc);

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository") private carsRepository: ICarsRepository,
    @inject("DateProvider") private dateProvider: IDateProvider
  ) {}

  async execute({
    carId,
    userId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumRentalHours = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      carId
    );

    if (carUnavailable) throw new AppError("Car is not available");

    const rentalOpenbyUserExists =
      await this.rentalsRepository.findOpenRentalByUserId(userId);

    if (rentalOpenbyUserExists)
      throw new AppError("This user already has an opened rental");

    // car rental should be 24h minimum
    const dateNow = this.dateProvider.now();
    const compare = this.dateProvider.compare(
      dateNow,
      expectedReturnDate,
      "hour"
    );

    if (compare < minimumRentalHours)
      throw new AppError(
        "Invalid return date. It must have a minimum of 24h between now and the return date."
      );

    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    await this.carsRepository.updateAvailability(carId, false);

    return rental;
  }
}

export { CreateRentalUseCase };
