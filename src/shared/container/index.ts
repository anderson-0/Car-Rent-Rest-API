import { ICategoriesRepository } from "src/modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "src/modules/cars/repositories/implementations/CategoriesRepository";
import { container } from "tsyringe";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);
