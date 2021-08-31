import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    carId,
    userId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, { carId, userId, expectedReturnDate });
    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.carId === carId && !rental.endDate
    );
  }
  async findOpenRentalByUserId(userId: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.userId === userId && !rental.endDate
    );
  }
}

export { RentalsRepositoryInMemory };