import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";

import { SendForgotPasswordEmailUseCase } from "./SendForgotPasswordEmailUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/inMemory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordEmailUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;

describe("Send Forgot Password Email Use Case", () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordEmailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );
  });
  describe("SHOULD", () => {
    it("Send a forgot mail password to the user", async () => {
      const sendMail = jest.spyOn(mailProvider, "sendMail");

      await usersRepository.create({
        driverLicense: "185537",
        email: "pa@vug.aw",
        name: "Kate Adkins",
        password: "BI0P",
      });

      await sendForgotPasswordMailUseCase.execute("pa@vug.aw");

      expect(sendMail).toHaveBeenCalled();
    });

    it("Create a user token when forgot password is called ", async () => {
      const usersTokensRepositorySpy = jest.spyOn(
        usersTokensRepository,
        "create"
      );

      await usersRepository.create({
        driverLicense: "522886",
        email: "so@vijce.br",
        name: "Lawrence Klein",
        password: "4hEW",
      });

      await sendForgotPasswordMailUseCase.execute("so@vijce.br");

      expect(usersTokensRepositorySpy).toHaveBeenCalled();
    });
  });
  describe("SHOULD NOT", () => {
    it("Send a forgot mail password to the non-existing user", async () => {
      await expect(
        sendForgotPasswordMailUseCase.execute("pa@vug.aw")
      ).rejects.toEqual(new AppError("User does not exist!"));
    });
  });
});
