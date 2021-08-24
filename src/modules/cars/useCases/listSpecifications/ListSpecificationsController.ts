import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase
    );
    const specifications = await listSpecificationsUseCase.execute();

    return res.status(201).json(specifications);
  }
}
export { ListSpecificationsController };
