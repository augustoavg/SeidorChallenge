import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import DriverController from '../../../controller/DriverController';

const driverController = new DriverController();
const driverRouter = Router();

driverRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      taxId: Joi.string().required().strict(true),
      name: Joi.string().required().strict(true),
    },
  }),
  driverController.create,
);

driverRouter.post(
  '/:taxId',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().strict(true),
    },
    [Segments.PARAMS]: {
      taxId: Joi.string().required().strict(true),
    },
  }),
  driverController.update,
);

driverRouter.delete(
  '/:taxId',
  celebrate({
    [Segments.PARAMS]: {
      taxId: Joi.string().required().strict(true),
    },
  }),
  driverController.delete,
);

export default driverRouter;
