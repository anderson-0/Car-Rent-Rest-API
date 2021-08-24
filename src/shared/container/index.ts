import { IUsersRepository } from "src/modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "src/modules/accounts/repositories/implementations/UsersRepository";
import { ICategoriesRepository } from "src/modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "src/modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "src/modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "src/modules/cars/repositories/ISpecificationsRepository";
import { container } from "tsyringe";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
