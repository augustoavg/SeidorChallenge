import AppError from '../../../../shared/errors/AppError';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import Automobile from '../../infra/mongoose/schemas/Automobile';
import CreateAutomobileService from '../../services/CreateAutomobileService';

describe('Create a new automobile - Unity', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Automobile.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to create a new automobile', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    };

    const createAutomobile = new CreateAutomobileService();

    const automobile = await createAutomobile.execute(automobileData);

    expect(automobile).toBeDefined();
    expect(automobile.licensePlate).toBe(automobileData.licensePlate);
  });

  it('should not be able to create two automobile with the same licensePlate', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    };

    await Automobile.create({
      _id: '10',
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    });

    const createAutomobile = new CreateAutomobileService();

    await expect(
      createAutomobile.execute(automobileData),
    ).rejects.toBeInstanceOf(AppError);
  });
});
