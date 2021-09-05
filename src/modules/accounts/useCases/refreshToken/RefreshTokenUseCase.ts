import auth from "@config/auth";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider") private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secretRefreshToken) as IPayload;
    const userId = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token
      );

    if (!userToken) throw new AppError("Refresh Token Not Found");

    await this.usersTokensRepository.deleteById(userToken.id);

    const now = this.dateProvider.now();

    const refreshTokenExpiresDate = this.dateProvider.add(now, 1, "day");
    const refreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: sub,
      expiresIn: auth.expiresInRefreshToken,
    });

    await this.usersTokensRepository.create({
      userId,
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    });

    const newToken = sign({}, auth.secretToken, {
      subject: userToken.userId,
      expiresIn: auth.expiresInToken,
    });

    return {
      token: newToken,
      refreshToken,
    };
  }
}

export { RefreshTokenUseCase };
