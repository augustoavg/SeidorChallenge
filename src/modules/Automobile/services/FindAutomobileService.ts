import AppError from '../../../shared/errors/AppError';
import Automobile, {
  IAutomobileInterface,
} from '../infra/mongoose/schemas/Automobile';

interface IRequestDTO {
  data: {
    color?: string;
    carBrand?: string;
  };
}

class FindAutomobileService {
  public async execute({ data }: IRequestDTO): Promise<IAutomobileInterface[]> {
    const automobile = await Automobile.find(data);

    if (automobile.length === 0) {
      throw new AppError('There is no car registred with this conditions.');
    }

    return automobile;
  }
}

export default FindAutomobileService;
