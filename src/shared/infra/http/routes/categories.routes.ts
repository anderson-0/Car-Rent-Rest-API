import { Router } from "express";
import multer from "multer";

import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const importCategoryController = new ImportCategoryController();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.use(ensureAdmin);

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
