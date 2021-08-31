import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { getRepository, Repository } from "typeorm";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental> {
    const rental = await this.repository.findOne(carId);
    return rental;
  }

  async findOpenRentalByUserId(userId: string): Promise<Rental> {
    const rental = await this.repository.findOne(userId);
    return rental;
  }

  async create({
    carId,
    userId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      carId,
      userId,
      expectedReturnDate,
    });

    await this.repository.save(rental);
    return rental;
  }
}

export { RentalsRepository };
