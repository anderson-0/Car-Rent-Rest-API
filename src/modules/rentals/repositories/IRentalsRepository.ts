import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findById(rentalId: string): Promise<Rental>;
  findOpenRentalByCarId(carId: string): Promise<Rental>;
  findOpenRentalByUserId(userId: string): Promise<Rental>;
  create({
    carId,
    userId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
