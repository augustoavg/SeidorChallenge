import AppError from '../../../../shared/errors/AppError';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import AutomobileUsage from '../../infra/mongoose/schemas/AutomobileUsage';
import Automobile from '../../../Automobile/infra/mongoose/schemas/Automobile';
import Driver from '../../../Driver/infra/mongoose/schemas/Driver';
import FindAutomobileUsageService from '../../services/FindAutomobileUsageService';

describe('Find automobile usage - Unity', () => {
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

  it('should be able to find automobile usage', async () => {
    const automobile = await Automobile.create({
      _id: '10',
      licensePlate: '10',
      color: 'blue',
      carBrand: 'nissan',
    });

    const driver = await Driver.create({
      _id: '12345678910',
      name: 'test',
      taxId: '12345678910',
    });

    await AutomobileUsage.create({
      driver: driver.taxId,
      automobile: automobile.licensePlate,
      reason: 'work',
    });

    const automobileUsage = new FindAutomobileUsageService();

    const usageUpdated = await automobileUsage.execute();

    expect(usageUpdated).toHaveLength(1);
  });
});
