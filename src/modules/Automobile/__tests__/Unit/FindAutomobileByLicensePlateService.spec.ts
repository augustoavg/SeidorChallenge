import AppError from '../../../../shared/errors/AppError';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import Automobile from '../../infra/mongoose/schemas/Automobile';
import FindByLicensePlateAutomobileService from '../../services/FindByLicensePlateAutomobileService';

describe('Find a automobile by license plate - Unity', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Automobile.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to find a automobile by license plate', async () => {
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

    const findAutomobileByLicensePlate = new FindByLicensePlateAutomobileService();

    const automobile = await findAutomobileByLicensePlate.execute({
      licensePlate: automobileData.licensePlate,
    });

    expect(automobile).toBeDefined();
    expect(automobile.licensePlate).toBe(automobileData.licensePlate);
  });

  it('should not be able to find a automobile by license plate if it does not exist', async () => {
    const findAutomobileByLicensePlate = new FindByLicensePlateAutomobileService();

    await expect(
      findAutomobileByLicensePlate.execute({ licensePlate: '1' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
