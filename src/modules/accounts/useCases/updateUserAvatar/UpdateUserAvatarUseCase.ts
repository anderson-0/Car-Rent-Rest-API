import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUpdateUserAvatarDTO } from "@modules/accounts/dtos/IUpdateUserAvatarDTO";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}
  async execute({ userId, avatarFile }: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (user.avatar) await this.storageProvider.delete(user.avatar, "avatar");

    await this.storageProvider.save(avatarFile, "avatar");

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
