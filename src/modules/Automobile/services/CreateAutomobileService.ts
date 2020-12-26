import Automobile, {
  IAutomobileInterface,
} from '../infra/mongoose/schemas/Automobile';
import AppError from '../../../shared/errors/AppError';

interface IRequestDTO {
  licensePlate: string;
  color: string;
  carBrand: string;
}

class CreateMovieService {
  public async execute({
    licensePlate,
    color,
    carBrand,
  }: IRequestDTO): Promise<IAutomobileInterface> {
    const findAutomible = await Automobile.findOne({ licensePlate });

    if (findAutomible) {
      throw new AppError("Automobile's license plate already registered.");
    }

    const automobile = await Automobile.create({
      licensePlate,
      color,
      carBrand,
    });

    return automobile;
  }
}

export default CreateMovieService;
