import { Router } from 'express';
import AutomobileRouter from '../../../modules/Automobile/infra/http/routes';

const routes = Router();

routes.use('/automobile', AutomobileRouter);

export default routes;
