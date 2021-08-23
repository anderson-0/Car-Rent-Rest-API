import { categoriesRoutes } from 'src/routes/categories.routes';
import { specificationsRoutes } from 'src/routes/specifications.routes';
import { Router } from 'express';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);

export { router };
