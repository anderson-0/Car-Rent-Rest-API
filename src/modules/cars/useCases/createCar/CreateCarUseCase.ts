import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const carExists = await this.carsRepository.findByLicensePlate(
      licensePlate
    );

    if (carExists) throw new AppError("License Plate already in use");

    const car = await this.carsRepository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      specifications,
    });

    return car;
  }
}

export { CreateCarUseCase };
