import { ResetUserPasswordController } from "@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController";
import { SendForgotPasswordEmailController } from "@modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController";
import { Router } from "express";

const passwordsRoutes = Router();

const sendForgotPasswordEmailController =
  new SendForgotPasswordEmailController();

const resetUserPassword = new ResetUserPasswordController();

passwordsRoutes.post("/forgot", sendForgotPasswordEmailController.handle);
passwordsRoutes.post("/reset", resetUserPassword.handle);

export { passwordsRoutes };
