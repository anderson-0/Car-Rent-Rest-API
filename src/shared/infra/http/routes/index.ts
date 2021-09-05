import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { authenticationRoutes } from "./authentication.routes";
import { carsRoutes } from "./cars.routes";
import { rentalsRoutes } from "./rentals.routes";
import { passwordsRoutes } from "./passwords.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalsRoutes);
router.use("/password", passwordsRoutes);
router.use(authenticationRoutes);

export { router };
