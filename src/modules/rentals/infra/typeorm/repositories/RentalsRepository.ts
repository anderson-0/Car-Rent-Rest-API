import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { getRepository, Repository } from "typeorm";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.repository.findOne({ where: { id, endDate: null } });
    return rental;
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { carId, endDate: null },
    });
    return rental;
  }

  async findOpenRentalByUserId(userId: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { userId, endDate: null },
    });
    return rental;
  }

  async create({
    carId,
    userId,
    expectedReturnDate,
    id,
    endDate,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      carId,
      userId,
      expectedReturnDate,
      id,
      endDate,
      total,
    });

    await this.repository.save(rental);
    return rental;
  }
}

export { RentalsRepository };
