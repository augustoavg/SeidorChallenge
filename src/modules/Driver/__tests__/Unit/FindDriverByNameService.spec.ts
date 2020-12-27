import AppError from '../../../../shared/errors/AppError';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import Driver from '../../infra/mongoose/schemas/Driver';
import FindDriverByNameService from '../../services/FindDriverByNameService';

describe('Find a driver by name - Unity', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Driver.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to find a driver by name', async () => {
    const driverData = {
      taxId: '12345678910',
      name: 'test',
    };

    const driverData2 = {
      taxId: '12345678911',
      name: 'test',
    };

    await Driver.create(driverData);
    await Driver.create(driverData2);

    const findDriver = new FindDriverByNameService();

    const driver = await findDriver.execute({
      data: { name: driverData.name },
    });

    expect(driver).toBeDefined();
    expect(driver).toHaveLength(2);
  });

  it('should not be able to find a driver if doesnt exists', async () => {
    const findDriver = new FindDriverByNameService();

    await expect(
      findDriver.execute({ data: { name: 'test2' } }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
