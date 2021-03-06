import { AppError } from "@shared/errors/AppError";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: IDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authentica User Use Case", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider
    );
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
      await expect(
        authenticateUserUseCase.execute({
          email: "email@email.com",
          password: "123456",
        })
      ).rejects.toEqual(new AppError("Email/password incorrect"));
    });

    it("Authenticate incorrect password", async () => {
      const user: ICreateUserDTO = {
        driverLicense: "000123",
        name: "Anderson",
        email: "anderson@abc.com",
        password: "123123",
      };

      await createUserUseCase.execute(user);

      await expect(
        authenticateUserUseCase.execute({
          email: "anderson@abc.com",
          password: "123456",
        })
      ).rejects.toEqual(new AppError("Email/password incorrect"));
    });
  });
});
