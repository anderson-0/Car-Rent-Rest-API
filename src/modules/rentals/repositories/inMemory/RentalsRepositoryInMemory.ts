import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

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
