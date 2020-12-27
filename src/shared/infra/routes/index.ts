import { Router } from 'express';
import AutomobileRouter from '../../../modules/Automobile/infra/http/routes';
import DriverRouter from '../../../modules/Driver/infra/http/routes';
import AutomobileUsageRouter from '../../../modules/AutomobileUsage/infra/http/routes';

const routes = Router();

routes.use('/automobile', AutomobileRouter);
routes.use('/driver', DriverRouter);
routes.use('/usage', AutomobileUsageRouter);

export default routes;
