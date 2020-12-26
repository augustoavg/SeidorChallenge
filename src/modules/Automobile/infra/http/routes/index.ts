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
  }),
  automobileController.update,
);
export default automobileRouter;
