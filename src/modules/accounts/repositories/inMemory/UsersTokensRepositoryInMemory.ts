import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private tokens: UserToken[];

  constructor() {
    this.tokens = [];
  }

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expiresDate,
      refreshToken,
      userId,
    });

    this.tokens.push(userToken);

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
