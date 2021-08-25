import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async findById(id: string): Promise<User> {
    const user = await this.users.find(user => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.users.find(user => user.email === email);
    return user;
  }

  async create({
    name,
    email,
    password,
    driverLicense,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driverLicense,
    });

    this.users.push(user);
  }
}

export { UsersRepositoryInMemory };
