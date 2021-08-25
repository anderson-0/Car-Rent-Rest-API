import { Category } from "../../entities/Category";
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
    it("Create new Category", async () => {
      const category = {
        name: "Category Test Name",
        description: "Category Test Description",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      const categoryExists = await categoriesRepositoryInMemory.findByName(
        category.name
      );

      console.log(categoryExists);

      expect(categoryExists).toHaveProperty("id");
      expect(category.name).toEqual(categoryExists.name);
      expect(category.description).toEqual(categoryExists.description);
      expect(categoryExists.createdAt).not.toBeNull();
    });
  });
  describe("SHOULD NOT", () => {});
});
