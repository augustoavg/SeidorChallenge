import AppError from '../../../shared/errors/AppError';
import Driver, { IDriverInterface } from '../infra/mongoose/schemas/Driver';

interface IRequestDTO {
  taxId: string;
}

class FindDriverService {
  public async execute({ taxId }: IRequestDTO): Promise<IDriverInterface> {
    const driver = await Driver.findOne({ taxId });

    if (!driver) {
      throw new AppError('There is no driver registred with this tax id.');
    }

    return driver;
  }
}

export default FindDriverService;
