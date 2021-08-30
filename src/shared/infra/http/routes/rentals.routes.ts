import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";
import { CreateRentalController } from "@modules/rentals/useCases/createRentalUseCase/CreateRentalController";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.use(ensureAuthenticated);
rentalsRoutes.use(ensureAdmin);

rentalsRoutes.post("/", createRentalController.handle);

export { rentalsRoutes };
