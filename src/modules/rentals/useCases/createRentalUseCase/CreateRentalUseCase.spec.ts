import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { CreateRentalUseCase } from "@modules/rentals/useCases/createRentalUseCase/CreateRentalUseCase";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { AppError } from "@shared/errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: IRentalsRepository;
let carsRepositoryInMemory: ICarsRepository;
let dayJsProvider: IDateProvider;

describe("Create Rental Use Case", () => {
  dayJsProvider = new DayjsDateProvider();
  const dayAdd24Hours = dayJsProvider.add(new Date(), 1, "day");

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dayJsProvider
    );
  });
  describe("SHOULD", () => {
    it("Create a new rental", async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Test",
        description: "Car Test",
        dailyRate: 100,
        licensePlate: "test",
        fineAmount: 40,
        categoryId: "1234",
        brand: "brand",
      });

      const rental = await createRentalUseCase.execute({
        userId: "12345",
        carId: car.id,
        expectedReturnDate: dayAdd24Hours,
      });

      expect(rental).toHaveProperty("id");
    });
  });
  describe("SHOULD NOT", () => {
    it("Create new rental if there is one open for the same user", async () => {
      expect(async () => {
        await createRentalUseCase.execute({
          userId: "12345",
          carId: "121211",
          expectedReturnDate: dayAdd24Hours,
        });
        await createRentalUseCase.execute({
          userId: "12345",
          carId: "121212",
          expectedReturnDate: dayAdd24Hours,
        });
      }).rejects.toBeInstanceOf(AppError);
    });

    it("Create new rental if there is one open for the same car", async () => {
      expect(async () => {
        await createRentalUseCase.execute({
          userId: "12344",
          carId: "121212",
          expectedReturnDate: new Date(),
        });
        await createRentalUseCase.execute({
          userId: "12345",
          carId: "121212",
          expectedReturnDate: new Date(),
        });
      }).rejects.toBeInstanceOf(AppError);
    });

    it("Create new rental if return date is less than 24h from current time.", async () => {
      expect(async () => {
        await createRentalUseCase.execute({
          userId: "12345",
          carId: "121211",
          expectedReturnDate: dayjs().toDate(),
        });
      }).rejects.toBeInstanceOf(AppError);
    });
  });
});
