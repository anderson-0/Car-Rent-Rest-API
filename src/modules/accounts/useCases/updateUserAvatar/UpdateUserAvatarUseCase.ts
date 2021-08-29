import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUpdateUserAvatarDTO } from "@modules/accounts/dtos/IUpdateUserAvatarDTO";

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}
  async execute({ userId, avatarFile }: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
