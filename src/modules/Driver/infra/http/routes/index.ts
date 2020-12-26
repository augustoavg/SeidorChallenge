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

export default driverRouter;
