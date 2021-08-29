import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe("Create Car Use Case", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  describe("SHOULD", () => {
    it("Create a new Car", async () => {
      const car = await createCarUseCase.execute({
        name: "Name Car",
        description: "Description Car",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "category",
      });

      expect(car).toHaveProperty("id");
    });

    it("Create a car with available as true by default", async () => {
      const car = await createCarUseCase.execute({
        name: "Name Car",
        description: "Description Car",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "category",
      });

      expect(car.available).toEqual(true);
    });
  });
  describe("SHOULD NOT", () => {
    it("Create new Car with duplicated license plate", async () => {
      expect(async () => {
        const car1 = await createCarUseCase.execute({
          name: "Car 1 Name",
          description: "Car 1 Description",
          dailyRate: 100,
          licensePlate: "ABC-1234",
          fineAmount: 60,
          brand: "Brand 1",
          categoryId: "category1",
        });

        await createCarUseCase.execute({
          name: "Car 2 Name",
          description: "Car 2 Description",
          dailyRate: 100,
          licensePlate: "ABC-1234",
          fineAmount: 60,
          brand: "Brand 2",
          categoryId: "category2",
        });
      }).rejects.toBeInstanceOf(AppError);
    });
  });
});
