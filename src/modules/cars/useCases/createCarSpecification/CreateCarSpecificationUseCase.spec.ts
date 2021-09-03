import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/inMemory/SpecificationsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: ICarsRepository;
let specificatonsRepositoryInMemory: ISpecificationsRepository;

describe("Create Car Specification Use Case", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificatonsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificatonsRepositoryInMemory
    );
  });
  describe("SHOULD", () => {
    it("Create a new Car Specification with 1 specification", async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Name Car",
        description: "Description Car",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "category",
      });

      const specification = await specificatonsRepositoryInMemory.create({
        name: "Specification 1",
        description: "Description 1",
      });

      const specifications_id = [specification.id];
      const specificationsCars = await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specifications_id,
      });

      expect(specificationsCars).toHaveProperty("specifications");
      expect(specificationsCars.specifications).toHaveLength(1);
    });

    it("Create a new Car Specification with more than 1 specification", async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Name Car",
        description: "Description Car",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "category",
      });

      const specification1 = await specificatonsRepositoryInMemory.create({
        name: "Specification 1",
        description: "Description 1",
      });

      const specification2 = await specificatonsRepositoryInMemory.create({
        name: "Specification 2",
        description: "Description 2",
      });

      const specifications_id = [specification1.id, specification2.id];
      const specificationsCars = await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specifications_id,
      });

      expect(specificationsCars).toHaveProperty("specifications");
      expect(specificationsCars.specifications).toHaveLength(2);
    });
  });
  describe("SHOULD NOT", () => {
    it("Create a new specification for a non-existing car", async () => {
      const car_id = "123";
      const specifications_id = ["54321"];
      await expect(
        createCarSpecificationUseCase.execute({
          car_id,
          specifications_id,
        })
      ).rejects.toEqual(new AppError("Car does not exist"));
    });
  });
});
