import AppError from '../../../shared/errors/AppError';
import Automobile, {
  IAutomobileInterface,
} from '../infra/mongoose/schemas/Automobile';

interface IRequestDTO {
  licensePlate: string;
}

class DeleteAutomobileService {
  public async execute({
    licensePlate,
  }: IRequestDTO): Promise<IAutomobileInterface> {
    const automobile = await Automobile.findOneAndDelete({ licensePlate });

    if (!automobile) {
      throw new AppError('There is no car registred with this license plate.');
    }

    return automobile;
  }
}

export default DeleteAutomobileService;
