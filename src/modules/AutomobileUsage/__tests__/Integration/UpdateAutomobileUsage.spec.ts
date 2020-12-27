import request from 'supertest';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import AutomobileUsage from '../../infra/mongoose/schemas/AutomobileUsage';
import Automobile from '../../../Automobile/infra/mongoose/schemas/Automobile';
import Driver from '../../../Driver/infra/mongoose/schemas/Driver';
import app from '../../../../app';

describe('Update a automobile usage - Integration', () => {
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

    const response = await request(app).post(`/usage/${driver.taxId}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to update a automobile usage when driver does not exist', async () => {
    const response = await request(app).post(`/usage/10`);

    expect(response.status).toBe(400);
  });

  it('should not be able to update a automobile usage when driver is not using a automobile', async () => {
    const driver = await Driver.create({
      name: 'test',
      taxId: '12345678910',
    });

    const response = await request(app).post(`/usage/${driver.taxId}`);

    expect(response.status).toBe(400);
  });
});
