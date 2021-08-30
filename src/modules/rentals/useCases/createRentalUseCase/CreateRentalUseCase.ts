import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository
  ) {}

  async execute({
    carId,
    userId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<void> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      carId
    );

    if (carUnavailable) throw new AppError("Car is not available");

    const rentalOpenbyUserExists =
      await this.rentalsRepository.findOpenRentalByUserId(userId);

    if (rentalOpenbyUserExists)
      throw new AppError("This user already has an opened rental");
  }
}

export { CreateRentalUseCase };
