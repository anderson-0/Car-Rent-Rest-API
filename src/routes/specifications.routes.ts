import { Router } from "express";
import { CreateCategoryController } from "src/modules/cars/useCases/createCategory/CreateCategoryController";
import { ListSpecificationsController } from "src/modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createCreateSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post("/", createCreateSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
