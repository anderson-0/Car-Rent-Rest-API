import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, brand, categoryId } = req.query;
    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );
    const cars = await listAvailableCarsUseCase.execute({
      name: name as string,
      brand: brand as string,
      categoryId: categoryId as string,
    });

    return res.status(200).json(cars);
  }
}
export { ListAvailableCarsController };
