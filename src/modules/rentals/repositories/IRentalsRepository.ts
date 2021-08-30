import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByCarId(carId: string): Promise<Rental>;
  findOpenRentalByUserId(userId: string): Promise<Rental>;
}

export { IRentalsRepository };
