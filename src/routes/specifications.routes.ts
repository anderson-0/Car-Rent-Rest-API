import { Router } from 'express';
import listSpecificationsController from 'src/modules/cars/useCases/listSpecifications';
import createSpecificationController from '../modules/cars/useCases/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (req, res) => {
  return createSpecificationController().handle(req, res);
});

specificationsRoutes.get('/', (req, res) => {
  return listSpecificationsController().handle(req, res);
});

export { specificationsRoutes };
