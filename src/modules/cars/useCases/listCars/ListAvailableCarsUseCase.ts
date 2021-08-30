import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute({ name, brand, categoryId }: IListCarsDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      name,
      brand,
      categoryId,
    });

    return cars;
  }
}

export { ListAvailableCarsUseCase };
