import AppError from '../../../../shared/errors/AppError';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import Driver from '../../infra/mongoose/schemas/Driver';
import CreateDriverService from '../../services/CreateDriverService';

describe('Create a new driver - Unity', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Driver.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to create a new driver', async () => {
    const driverData = {
      taxId: '12345678910',
      name: 'teste',
    };

    const createDriver = new CreateDriverService();

    const driver = await createDriver.execute(driverData);

    expect(driver).toBeDefined();
    expect(driver.taxId).toBe(driverData.taxId);
  });

  it('should not be able to create a driver if already exists', async () => {
    const driverData = {
      _id: '12345678910',
      taxId: '12345678910',
      name: 'teste',
    };

    await Driver.create(driverData);

    const createDriver = new CreateDriverService();

    await expect(createDriver.execute(driverData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
