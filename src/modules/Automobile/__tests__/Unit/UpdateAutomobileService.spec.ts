import AppError from '../../../../shared/errors/AppError';
import Automobile from '../../infra/mongoose/schemas/Automobile';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import UpdateAutomobileService from '../../services/UpdateAutomobileService';

describe('Update a automobile - Integration', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Automobile.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to update a automobile', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    };

    await Automobile.create(automobileData);

    const updateAutomobile = new UpdateAutomobileService();

    const updatedAutomobile = await updateAutomobile.execute({
      licensePlate: automobileData.licensePlate,
      color: 'black',
      carBrand: 'nissan',
    });

    expect(updatedAutomobile).toBeDefined();
    expect(updatedAutomobile.licensePlate).toBe(automobileData.licensePlate);
  });

  it('should not be able to update a automobile that does not exist', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    };

    const updateAutomobile = new UpdateAutomobileService();

    await expect(
      updateAutomobile.execute(automobileData),
    ).rejects.toBeInstanceOf(AppError);
  });
});
