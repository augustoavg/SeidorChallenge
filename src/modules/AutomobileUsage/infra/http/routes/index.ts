import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AutomobileUsageController from '../../../controller/AutomobileUsageController';

const automobileUsageController = new AutomobileUsageController();
const automobileUsageRouter = Router();

automobileUsageRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      driver: Joi.string().required().strict(true),
      automobilePlate: Joi.string().required().strict(true),
      reason: Joi.string().required().strict(true),
    },
  }),
  automobileUsageController.create,
);

automobileUsageRouter.post(
  '/:taxId',
  celebrate({
    [Segments.PARAMS]: {
      taxId: Joi.string().required().strict(true),
    },
  }),
  automobileUsageController.update,
);

export default automobileUsageRouter;
