import { AppError } from "@errors/AppError";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository: IUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authentica User Use Case", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  });
  describe("SHOULD", () => {
    it("Authenticate an existing user", async () => {
      const user: ICreateUserDTO = {
        driverLicense: "000123",
        name: "Anderson",
        email: "anderson@abc.com",
        password: "123123",
      };

      await createUserUseCase.execute(user);

      const result = await authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      });

      expect(result).toHaveProperty("token");
    });
  });

  describe("SHOULD NOT", () => {
    it("Authenticate a non-existing user", async () => {
      expect(async () => {
        const result = await authenticateUserUseCase.execute({
          email: "email@email.com",
          password: "123456",
        });
      }).rejects.toBeInstanceOf(AppError);
    });

    it("Authenticate incorrect password", async () => {
      const user: ICreateUserDTO = {
        driverLicense: "000123",
        name: "Anderson",
        email: "anderson@abc.com",
        password: "123123",
      };

      await createUserUseCase.execute(user);

      expect(async () => {
        const result = await authenticateUserUseCase.execute({
          email: "anderson@abc.com",
          password: "123456",
        });
      }).rejects.toBeInstanceOf(AppError);
    });
  });
});
