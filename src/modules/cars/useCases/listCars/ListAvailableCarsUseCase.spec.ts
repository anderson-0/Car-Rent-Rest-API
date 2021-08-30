import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe("List Available Cars Use Case", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });
  describe("SHOULD", () => {
    it("List all available cars", async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Name Car",
        description: "Description Car",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "category",
      });
      const cars = await listAvailableCarsUseCase.execute({});

      expect(cars).toBeInstanceOf(Array);
      expect(cars).toHaveLength(1);
      expect(cars).toEqual([car]);
    });

    it("List all available cars filter by brand", async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Name Car",
        description: "Description Car",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "category",
      });
      const cars = await listAvailableCarsUseCase.execute({ brand: car.brand });

      expect(cars).toBeInstanceOf(Array);
      expect(cars).toHaveLength(1);
      expect(cars).toEqual([car]);
    });

    it("List all available cars filter by name", async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Name Car",
        description: "Description Car",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "category",
      });
      const cars = await listAvailableCarsUseCase.execute({ name: car.name });

      expect(cars).toBeInstanceOf(Array);
      expect(cars).toHaveLength(1);
      expect(cars).toEqual([car]);
    });

    it("List all available cars filter by category", async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Name Car",
        description: "Description Car",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "category",
      });
      const cars = await listAvailableCarsUseCase.execute({
        categoryId: car.categoryId,
      });

      expect(cars).toBeInstanceOf(Array);
      expect(cars).toHaveLength(1);
      expect(cars).toEqual([car]);
    });
  });
});
