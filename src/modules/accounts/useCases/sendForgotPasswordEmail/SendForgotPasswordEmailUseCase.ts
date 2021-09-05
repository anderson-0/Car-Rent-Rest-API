import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

@injectable()
class SendForgotPasswordEmailUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider") private dateProvider: IDateProvider,
    @inject("MailProvider") private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("User does not exist!");

    const token = uuidV4();

    const now = this.dateProvider.now();

    const expiresInThreeHours = this.dateProvider.add(now, 3, "hour");

    await this.usersTokensRepository.create({
      refreshToken: token,
      userId: user.id,
      expiresDate: expiresInThreeHours,
    });

    this.mailProvider.sendMail(
      email,
      "Recuperacao de senha",
      `Link para o reset: ${token}`
    );
  }
}

export { SendForgotPasswordEmailUseCase };
