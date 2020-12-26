import AppError from '../../../../shared/errors/AppError';
import Automobile from '../../infra/mongoose/schemas/Automobile';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import FindAutomobileService from '../../services/FindAutomobileService';

describe('Find a automobile - Integration', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Automobile.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to find all automobile', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    };

    const automobileData2 = {
      licensePlate: '11',
      color: 'blue',
      carBrand: 'nissan',
    };

    await Automobile.create(automobileData);
    await Automobile.create(automobileData2);

    const findAutomobile = new FindAutomobileService();

    const automobile = await findAutomobile.execute({ data: {} });

    expect(automobile).toHaveLength(2);
  });

  it('should be able to find automobile by color', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    };

    const automobileData2 = {
      licensePlate: '11',
      color: 'blue',
      carBrand: 'nissan',
    };

    await Automobile.create(automobileData);
    await Automobile.create(automobileData2);

    const findAutomobile = new FindAutomobileService();

    const automobile = await findAutomobile.execute({
      data: { color: 'blue' },
    });

    expect(automobile).toHaveLength(2);
  });

  it('should not be able to find a automobile by carBrand', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    };

    const automobileData2 = {
      licensePlate: '11',
      color: 'blue',
      carBrand: 'nissan',
    };

    await Automobile.create(automobileData);
    await Automobile.create(automobileData2);

    const findAutomobile = new FindAutomobileService();

    const automobile = await findAutomobile.execute({
      data: { carBrand: 'nissan' },
    });

    expect(automobile).toHaveLength(1);
  });

  it('should not be able to find a automobile by carBrand and color', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'red',
      carBrand: 'nissan',
    };

    const automobileData2 = {
      licensePlate: '11',
      color: 'blue',
      carBrand: 'nissan',
    };

    const automobileData3 = {
      licensePlate: '12',
      color: 'blue',
      carBrand: 'nissan',
    };

    await Automobile.create(automobileData);
    await Automobile.create(automobileData2);
    await Automobile.create(automobileData3);

    const findAutomobile = new FindAutomobileService();

    const automobile = await findAutomobile.execute({
      data: { carBrand: 'nissan', color: 'blue' },
    });

    expect(automobile).toHaveLength(2);
  });

  it('should not be able to find a automobile if it does not exist', async () => {
    const findAutomobile = new FindAutomobileService();

    await expect(
      findAutomobile.execute({ data: { color: 'blue' } }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
