import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
  create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken>;
}

export { IUsersTokensRepository };
