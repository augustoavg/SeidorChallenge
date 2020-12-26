import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AutomobileController from '../../../controller/AutomobileController';

const automobileController = new AutomobileController();
const automobileRouter = Router();

automobileRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      licensePlate: Joi.string().required().strict(true),
      color: Joi.string().required().strict(true),
      carBrand: Joi.string().required().strict(true),
    },
  }),
  automobileController.create,
);

automobileRouter.post(
  '/:licensePlate',
  celebrate({
    [Segments.BODY]: {
      color: Joi.string().required().strict(true),
      carBrand: Joi.string().required().strict(true),
    },
    [Segments.PARAMS]: {
      licensePlate: Joi.string().required().strict(true),
    },
  }),
  automobileController.update,
);

automobileRouter.delete(
  '/:licensePlate',
  celebrate({
    [Segments.PARAMS]: {
      licensePlate: Joi.string().required().strict(true),
    },
  }),
  automobileController.delete,
);

automobileRouter.get(
  '/:licensePlate',
  celebrate({
    [Segments.PARAMS]: {
      licensePlate: Joi.string().required().strict(true),
    },
  }),
  automobileController.findByLicensePlate,
);

automobileRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      data: Joi.object().strict(true),
    },
  }),
  automobileController.find,
);

export default automobileRouter;
