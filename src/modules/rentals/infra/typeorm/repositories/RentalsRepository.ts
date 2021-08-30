import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

class RentalsRepository implements IRentalsRepository {
  create({
    carId,
    userId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findOpenRentalByCarId(carId: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findOpenRentalByUserId(userId: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
}

export { RentalsRepository };
