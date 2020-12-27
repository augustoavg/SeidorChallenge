import AppError from '../../../shared/errors/AppError';
import Driver, { IDriverInterface } from '../infra/mongoose/schemas/Driver';

interface IRequestDTO {
  data: { name: string };
}

class FindDriverByNameService {
  public async execute({ data }: IRequestDTO): Promise<IDriverInterface[]> {
    const driver = await Driver.find(data);

    if (driver.length === 0) {
      throw new AppError('There is no driver registred with this name.');
    }

    return driver;
  }
}

export default FindDriverByNameService;
