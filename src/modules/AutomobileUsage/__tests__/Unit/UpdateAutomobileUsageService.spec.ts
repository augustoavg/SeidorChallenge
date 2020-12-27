import AppError from '../../../../shared/errors/AppError';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import AutomobileUsage from '../../infra/mongoose/schemas/AutomobileUsage';
import Automobile from '../../../Automobile/infra/mongoose/schemas/Automobile';
import Driver from '../../../Driver/infra/mongoose/schemas/Driver';
import UpdateAutomobileUsageService from '../../services/UpdateAutomobileUsageService';

describe('Update a automobile usage - Unity', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await AutomobileUsage.deleteMany({});
    await Automobile.deleteMany({});
    await Driver.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to update a automobile usage', async () => {
    const automobile = await Automobile.create({
      licensePlate: '10',
      color: 'blue',
      carBrand: 'nissan',
    });

    const driver = await Driver.create({
      name: 'test',
      taxId: '12345678910',
    });

    await AutomobileUsage.create({
      driver: driver.taxId,
      automobile: automobile.licensePlate,
      reason: 'work',
    });

    const updateAutomobileUsage = new UpdateAutomobileUsageService();

    const usageUpdated = await updateAutomobileUsage.execute({
      taxId: driver.taxId,
    });

    expect(usageUpdated).toBeDefined();
    expect(usageUpdated.endDate).toBeDefined();
    expect(usageUpdated.automobile).toBe(automobile.licensePlate);
    expect(usageUpdated.driver).toBe(driver.taxId);
  });

  it('should not be able to update a automobile usage when driver does not exist', async () => {
    const updateAutomobileUsage = new UpdateAutomobileUsageService();

    await expect(
      updateAutomobileUsage.execute({
        taxId: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a automobile usage when driver is not using a automobile', async () => {
    const driver = await Driver.create({
      name: 'test',
      taxId: '12345678910',
    });

    const updateUsage = new UpdateAutomobileUsageService();

    await expect(
      updateUsage.execute({
        taxId: driver.taxId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
