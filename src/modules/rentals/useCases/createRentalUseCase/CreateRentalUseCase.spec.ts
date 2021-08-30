import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { CreateRentalUseCase } from "@modules/rentals/useCases/createRentalUseCase/CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: IRentalsRepository;
const dayAdd24Hours = dayjs().add(1, "day").toDate();

describe("Create Rental Use Case", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });
  describe("SHOULD", () => {
    it("Create a new rental", async () => {
      const rental = await createRentalUseCase.execute({
        userId: "12345",
        carId: "121212",
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
