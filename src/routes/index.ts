import { categoriesRoutes } from "src/routes/categories.routes";
import { specificationsRoutes } from "src/routes/specifications.routes";
import { Router } from "express";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);

export { router };
