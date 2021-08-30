import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { CreateRentalUseCase } from "@modules/rentals/useCases/createRentalUseCase/CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: IRentalsRepository;

describe("Create Rental Use Case", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });
  describe("SHOULD", () => {
    it("Create a new rental", async () => {
      // await createRentalUseCase.execute({
      //   userId: "12345",
      //   carId: "121212",
      //   expectedReturnDate: new Date(),
      // });
    });
  });
  // describe("SHOULD NOT", () => {
  //   it("Create new Category with duplicated name", async () => {
  //     // expect(async () => {}).rejects.toBeInstanceOf(AppError);
  //     await createRentalUseCase.execute({
  //       userId: "12345",
  //       carId: "121212",
  //       expectedReturnDate: new Date(),
  //     });
  //   });
  // });
});
