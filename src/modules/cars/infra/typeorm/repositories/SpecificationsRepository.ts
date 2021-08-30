import { Repository, getRepository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }
  findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.repository.findByIds(ids);
    return specifications;
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = await this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });
    return specification;
  }

  async list(): Promise<Specification[]> {
    const categories = await this.repository.find();
    return categories;
  }
}

export { SpecificationsRepository };
