import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import {
  IAuthenticateUserRequestDTO,
  IAuthenticateUserResponseDTO,
} from "@modules/accounts/dtos/IAuthenticateUserDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider") private dateProvider: IDateProvider
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserRequestDTO): Promise<IAuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      secretToken,
      secretRefreshToken,
      expiresInToken,
      expiresInRefreshToken,
      expireRefreshTokenDays,
    } = auth;

    if (!user) throw new AppError("Email/password incorrect");

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError("Email/password incorrect");

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken,
    });

    const refreshToken = sign(
      {
        email,
      },
      secretRefreshToken,
      {
        subject: user.id,
        expiresIn: expiresInRefreshToken,
      }
    );

    const now = this.dateProvider.now();
    const refreshTokenExpiresDate = this.dateProvider.add(
      now,
      expireRefreshTokenDays,
      "day"
    );

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken: refreshToken,
      expiresDate: refreshTokenExpiresDate,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };
  }
}

export { AuthenticateUserUseCase };
