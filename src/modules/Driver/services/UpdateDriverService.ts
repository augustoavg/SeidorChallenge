import AppError from '../../../shared/errors/AppError';
import Driver, { IDriverInterface } from '../infra/mongoose/schemas/Driver';

interface IRequestDTO {
  taxId: string;
  name: string;
}

class UpdateDriverService {
  public async execute({
    taxId,
    name,
  }: IRequestDTO): Promise<IDriverInterface> {
    const driver = await Driver.findOneAndUpdate(
      { taxId },
      { $set: { name } },
      { new: true },
    );

    if (!driver) {
      throw new AppError('There is no driver registred with this tax id.');
    }

    return driver;
  }
}

export default UpdateDriverService;
