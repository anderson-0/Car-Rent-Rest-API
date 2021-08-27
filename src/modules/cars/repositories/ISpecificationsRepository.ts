import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";

import { Specification } from "@modules/cars/entities/Specification";

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
}

export { ISpecificationsRepository };
