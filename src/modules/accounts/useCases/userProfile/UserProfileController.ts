import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserProfileUseCase } from "./UserProfileUseCase";

class UserProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const userProfileUseCase = container.resolve(UserProfileUseCase);

    const user = await userProfileUseCase.execute(id);

    return res.json(user);
  }
}

export { UserProfileController };
