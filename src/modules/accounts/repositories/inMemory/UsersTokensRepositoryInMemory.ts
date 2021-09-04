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

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken> {
    const userToken = this.tokens.find(
      userToken =>
        userToken.userId === userId && userToken.refreshToken === refreshToken
    );
    return userToken;
  }

  async deleteById(refreshTokenId: string): Promise<void> {
    const refreshTokenIndex = this.tokens.findIndex(
      refreshToken => refreshToken.id === refreshTokenId
    );

    if (refreshTokenIndex !== -1) delete this.tokens[refreshTokenIndex];
  }
}

export { UsersTokensRepositoryInMemory };
