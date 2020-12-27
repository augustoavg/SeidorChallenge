import Driver, { IDriverInterface } from '../infra/mongoose/schemas/Driver';
import AppError from '../../../shared/errors/AppError';

interface IRequestDTO {
  taxId: string;
  name: string;
}

class CreateDriverService {
  public async execute({
    taxId,
    name,
  }: IRequestDTO): Promise<IDriverInterface> {
    const findDriver = await Driver.findOne({ taxId });

    if (findDriver) {
      throw new AppError('Driver is already registered.');
    }

    const automobile = await Driver.create({
      _id: taxId,
      taxId,
      name,
    });

    return automobile;
  }
}

export default CreateDriverService;
