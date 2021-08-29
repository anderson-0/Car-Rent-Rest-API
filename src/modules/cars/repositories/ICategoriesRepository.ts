import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
