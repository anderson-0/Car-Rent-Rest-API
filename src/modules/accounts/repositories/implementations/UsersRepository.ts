import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async create({
    name,
    username,
    email,
    password,
    driverLicense,
  }: ICreateUserDTO): Promise<void> {
    const user = await this.repository.create({
      name,
      username,
      email,
      password,
      driverLicense,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
