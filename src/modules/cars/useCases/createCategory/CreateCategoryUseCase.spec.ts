import { AppError } from "@shared/errors/AppError";

import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: ICategoriesRepository;

describe("Create Category Use Case", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  describe("SHOULD", () => {
    it("Create a new category", async () => {
      const category = {
        name: "Category Test",
        description: "Category description Test",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      const categoryCreated = await categoriesRepositoryInMemory.findByName(
        category.name
      );

      expect(categoryCreated).toHaveProperty("id");
    });
  });
  describe("SHOULD NOT", () => {
    it("Create new Category with duplicated name", async () => {
      const category = {
        name: "Category Test Name",
        description: "Category Test Description",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await expect(
        createCategoryUseCase.execute({
          name: category.name,
          description: category.description,
        })
      ).rejects.toEqual(new AppError("Category already exists"));
    });
  });
});
