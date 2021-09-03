import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository") private carsRepository: ICarsRepository,
    @inject("DateProvider") private dateProvider: IDateProvider
  ) {}
  async execute(rentalId: string, userId: string): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rentalId);
    if (!rental)
      throw new AppError("Rental does not exist or was done already", 404);

    const car = await this.carsRepository.findById(rental.carId);
    const minimumDaily = 1;

    let daily = this.dateProvider.compare(
      rental.startDate,
      this.dateProvider.now(),
      "day"
    );

    if (daily < 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compare(
      this.dateProvider.now(),
      rental.expectedReturnDate,
      "day"
    );

    let total = 0;

    if (delay > 0) {
      const calculatedFine = delay * car.fineAmount;
      total = calculatedFine;
    }

    total += daily * car.dailyRate;

    rental.endDate = this.dateProvider.now();
    rental.total = total;

    await this.rentalsRepository.create(rental);

    await this.carsRepository.updateAvailability(rental.carId, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
