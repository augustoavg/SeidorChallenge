import AppError from '../../../../shared/errors/AppError';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import AutomobileUsage from '../../infra/mongoose/schemas/AutomobileUsage';
import Automobile from '../../../Automobile/infra/mongoose/schemas/Automobile';
import Driver from '../../../Driver/infra/mongoose/schemas/Driver';
import CreateAutomobileUsageService from '../../services/CreateAutomobileUsageService';

describe('Create a new automobile usage - Unity', () => {
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

  it('should be able to create a new automobile usage', async () => {
    const automobile = await Automobile.create({
      licensePlate: '10',
      color: 'blue',
      carBrand: 'nissan',
    });

    const driver = await Driver.create({
      name: 'test',
      taxId: '12345678910',
    });

    const createAutomobileUsage = new CreateAutomobileUsageService();

    const automobileUsage = await createAutomobileUsage.execute({
      driver: driver.taxId,
      automobilePlate: automobile.licensePlate,
      reason: 'work',
    });

    expect(automobileUsage).toBeDefined();
    expect(automobileUsage.automobile).toBe(automobile.licensePlate);
    expect(automobileUsage.driver).toBe(driver.taxId);
  });

  it('should not be able to create a new automobile usage when automobile does not exist', async () => {
    const driver = await Driver.create({
      name: 'test',
      taxId: '12345678910',
    });

    const createAutomobileUsage = new CreateAutomobileUsageService();

    await expect(
      createAutomobileUsage.execute({
        driver: driver.taxId,
        automobilePlate: '10',
        reason: 'work',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new automobile usage when driver does not exist', async () => {
    const automobile = await Automobile.create({
      licensePlate: '10',
      color: 'blue',
      carBrand: 'nissan',
    });

    const createAutomobileUsage = new CreateAutomobileUsageService();

    await expect(
      createAutomobileUsage.execute({
        driver: '12345678910',
        automobilePlate: automobile.licensePlate,
        reason: 'work',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new automobile usage if automobile is already being used', async () => {
    const automobile = await Automobile.create({
      licensePlate: '10',
      color: 'blue',
      carBrand: 'nissan',
    });

    const driver = await Driver.create({
      name: 'test',
      taxId: '12345678910',
    });

    const driver2 = await Driver.create({
      name: 'test2',
      taxId: '12345678911',
    });

    await AutomobileUsage.create({
      driver: driver.taxId,
      automobile: automobile.licensePlate,
      reason: 'work',
    });

    const createAutomobileUsage = new CreateAutomobileUsageService();

    await expect(
      createAutomobileUsage.execute({
        driver: driver2.taxId,
        automobilePlate: automobile.licensePlate,
        reason: 'work',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new automobile usage if driver is already using one automobile', async () => {
    const automobile = await Automobile.create({
      licensePlate: '10',
      color: 'blue',
      carBrand: 'nissan',
    });

    const automobile2 = await Automobile.create({
      licensePlate: '11',
      color: 'black',
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

    const createAutomobileUsage = new CreateAutomobileUsageService();

    await expect(
      createAutomobileUsage.execute({
        driver: driver.taxId,
        automobilePlate: automobile2.licensePlate,
        reason: 'work',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
