import AppError from '../../../../shared/errors/AppError';
import Automobile from '../../infra/mongoose/schemas/Automobile';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import DeleteAutomobileService from '../../services/DeleteAutomobileService';

describe('Delete a automobile - Integration', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Automobile.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to delete a automobile', async () => {
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

    const deleteAutomobile = new DeleteAutomobileService();

    const deletedAutomobile = await deleteAutomobile.execute({
      licensePlate: automobileData.licensePlate,
    });

    expect(deletedAutomobile).toBeDefined();
    expect(deletedAutomobile.licensePlate).toBe(automobileData.licensePlate);
  });

  it('should not be able to delete a automobile that does not exist', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    };

    const deleteAutomobile = new DeleteAutomobileService();

    await expect(
      deleteAutomobile.execute({ licensePlate: automobileData.licensePlate }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
