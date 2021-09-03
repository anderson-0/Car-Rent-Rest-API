import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";

import { CreateRentalController } from "@modules/rentals/useCases/createRentalUseCase/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.use(ensureAuthenticated);

rentalsRoutes.get("/", listRentalsByUserController.handle);
rentalsRoutes.post("/", createRentalController.handle);
rentalsRoutes.post("/devolution/:id", devolutionRentalController.handle);

export { rentalsRoutes };
