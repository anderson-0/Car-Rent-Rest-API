import { IResetUserPasswordDTO } from "@modules/accounts/dtos/IResetUserPasswordDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider") private dateProvider: IDateProvider,
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IResetUserPasswordDTO): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) throw new AppError("Invalid token!");

    if (
      this.dateProvider.isBefore(userToken.expiresDate, this.dateProvider.now())
    ) {
      throw new AppError("Token expired!");
    }

    const user = await this.usersRepository.findById(userToken.userId);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
export { ResetUserPasswordUseCase };
