import AppError from '../../../../shared/errors/AppError';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import Driver from '../../infra/mongoose/schemas/Driver';
import FindDriverService from '../../services/FindDriverService';

describe('Find a driver by tax id - Unity', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Driver.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to find a driver', async () => {
    const driverData = {
      taxId: '12345678910',
      name: 'test',
    };

    await Driver.create(driverData);

    const findDriver = new FindDriverService();

    const driver = await findDriver.execute({
      taxId: driverData.taxId,
    });

    expect(driver).toBeDefined();
    expect(driver.taxId).toBe(driverData.taxId);
  });

  it('should not be able to find a driver if doesnt exists', async () => {
    const driverData = {
      taxId: '12345678910',
      name: 'teste',
    };

    const findDriver = new FindDriverService();

    await expect(findDriver.execute(driverData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
