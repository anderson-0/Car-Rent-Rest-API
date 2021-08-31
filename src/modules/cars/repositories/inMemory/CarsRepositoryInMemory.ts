import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findById(id: string): Promise<Car> {
    const car = this.cars.find(car => car.id === id);
    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = this.cars.find(car => car.licensePlate === licensePlate);
    return car;
  }

  async list(): Promise<Car[]> {
    return this.cars;
  }

  async findAvailable({
    name,
    brand,
    categoryId,
  }: IListCarsDTO): Promise<Car[]> {
    const carsAvailable = this.cars.filter(
      car =>
        car.available ||
        (brand && car.brand === brand) ||
        (categoryId && car.categoryId === categoryId) ||
        (name && car.name === name)
    );
    return carsAvailable;
  }

  async create({
    id,
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      specifications,
    });
    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory };
