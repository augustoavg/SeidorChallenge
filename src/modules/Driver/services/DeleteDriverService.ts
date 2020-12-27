import AppError from '../../../shared/errors/AppError';
import Driver, { IDriverInterface } from '../infra/mongoose/schemas/Driver';

interface IRequestDTO {
  taxId: string;
}

class DeleteDriverService {
  public async execute({ taxId }: IRequestDTO): Promise<IDriverInterface> {
    const driver = await Driver.findOneAndDelete({ taxId });

    if (!driver) {
      throw new AppError('There is no driver registred with this tax id.');
    }

    return driver;
  }
}

export default DeleteDriverService;
