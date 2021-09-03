import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";
import { CreateRentalController } from "@modules/rentals/useCases/createRentalUseCase/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
rentalsRoutes.use(ensureAuthenticated);
rentalsRoutes.use(ensureAdmin);

rentalsRoutes.post("/", createRentalController.handle);
rentalsRoutes.post("/devolution/:id", devolutionRentalController.handle);

export { rentalsRoutes };
