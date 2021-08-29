import { Router } from "express";

import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.get("/", listSpecificationsController.handle);

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.use(ensureAdmin);

specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
