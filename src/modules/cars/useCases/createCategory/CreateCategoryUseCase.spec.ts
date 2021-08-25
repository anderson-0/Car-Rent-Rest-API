import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/inMemory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category Use Case", () => {
  describe("SHOULD", () => {
    beforeEach(() => {
      categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
      createCategoryUseCase = new CreateCategoryUseCase(
        categoriesRepositoryInMemory
      );
    });
  });
  describe("SHOULD NOT", () => {
    it("Create new Category with duplicated name", async () => {
      expect(async () => {
        const category = {
          name: "Category Test Name",
          description: "Category Test Description",
        };

        await createCategoryUseCase.execute({
          name: category.name,
          description: category.description,
        });

        await createCategoryUseCase.execute({
          name: category.name,
          description: category.description,
        });
      }).rejects.toBeInstanceOf(AppError);
    });
  });
});
