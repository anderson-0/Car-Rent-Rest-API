import { getRepository, Repository } from "typeorm";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
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
    const car = this.repository.create({
      id,
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  async list(): Promise<Car[]> {
    const cars = await this.repository.find();
    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);

    return car;
  }

  async findAvailable({
    name,
    brand,
    categoryId,
  }: IListCarsDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) carsQuery.andWhere("c.brand = :brand", { brand });
    if (name) carsQuery.andWhere("c.name = :name", { name });
    if (categoryId)
      carsQuery.andWhere("c.category_id = :categoryId", { categoryId });

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({ licensePlate });
    return car;
  }
}

export { CarsRepository };
