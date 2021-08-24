import { Router } from "express";
import { CreateUserController } from "src/modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

// usersRoutes.get("/", listSpecificationsController.handle);

export { usersRoutes };
