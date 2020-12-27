import AutomobileUsage, {
  IAutomobileUsageInterface,
} from '../infra/mongoose/schemas/AutomobileUsage';
import AppError from '../../../shared/errors/AppError';

class FindAutomobileUsageService {
  public async execute(): Promise<IAutomobileUsageInterface[]> {
    const updateAutomobileUsage = await AutomobileUsage.find()
      .populate({
        path: 'driver',
        model: 'Driver',
        select: '-createdAt -updatedAt -__v -_id -taxId',
      })
      .populate({
        path: 'automobile',
        model: 'Automobile',
        select: '-createdAt -updatedAt -__v -_id',
      });

    return updateAutomobileUsage;
  }
}

export default FindAutomobileUsageService;
