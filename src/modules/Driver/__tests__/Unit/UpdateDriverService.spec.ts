import AppError from '../../../../shared/errors/AppError';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import Driver from '../../infra/mongoose/schemas/Driver';
import UpdateDriverService from '../../services/UpdateDriverService';

describe('Update a driver - Unity', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Driver.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to update a driver', async () => {
    const driverData = {
      _id: '12345678910',
      taxId: '12345678910',
      name: 'test',
    };

    await Driver.create(driverData);

    const updateDriver = new UpdateDriverService();

    const driver = await updateDriver.execute({
      taxId: driverData.taxId,
      name: 'test two',
    });

    expect(driver).toBeDefined();
    expect(driver.taxId).toBe(driverData.taxId);
  });

  it('should not be able to update a driver if doesnt exists', async () => {
    const driverData = {
      taxId: '12345678910',
      name: 'teste',
    };

    const updateDriver = new UpdateDriverService();

    await expect(updateDriver.execute(driverData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
