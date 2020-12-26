import AppError from '../../../shared/errors/AppError';
import Automobile, {
  IAutomobileInterface,
} from '../infra/mongoose/schemas/Automobile';

interface IRequestDTO {
  licensePlate: string;
  color: string;
  carBrand: string;
}

class UpdateAutomobileService {
  public async execute({
    licensePlate,
    color,
    carBrand,
  }: IRequestDTO): Promise<IAutomobileInterface> {
    const automobile = await Automobile.findOneAndUpdate(
      { licensePlate },
      { $set: { color, carBrand } },
      { new: true },
    );

    if (!automobile) {
      throw new AppError('There is no car registred with this license plate.');
    }

    return automobile;
  }
}

export default UpdateAutomobileService;
