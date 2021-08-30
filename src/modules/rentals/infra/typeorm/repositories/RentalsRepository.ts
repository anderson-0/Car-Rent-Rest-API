import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

class RentalsRepository implements IRentalsRepository {
  findOpenRentalByCarId(carId: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findOpenRentalByUserId(userId: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
}

export { RentalsRepository };
