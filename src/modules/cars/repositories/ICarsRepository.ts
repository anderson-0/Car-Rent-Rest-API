import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

interface ICarsRepository {
  findByLicensePlate(licensePlate: string): Promise<Car>;
  list(): Promise<Car[]>;
  findAvailable({ name, brand, categoryId }: IListCarsDTO): Promise<Car[]>;
  create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    categoryId,
    brand,
  }: ICreateCarDTO): Promise<Car>;
}

export { ICarsRepository };
