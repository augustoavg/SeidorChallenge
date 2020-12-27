import request from 'supertest';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import AutomobileUsage from '../../infra/mongoose/schemas/AutomobileUsage';
import Automobile from '../../../Automobile/infra/mongoose/schemas/Automobile';
import Driver from '../../../Driver/infra/mongoose/schemas/Driver';
import app from '../../../../app';

describe('Create a new automobile usage - Integration', () => {
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

    const response = await request(app).post(`/usage`).send({
      driver: driver.taxId,
      automobilePlate: automobile.licensePlate,
      reason: 'work',
    });

    expect(response.status).toBe(200);
    expect(response.body.automobile).toBe(automobile.licensePlate);
    expect(response.body.driver).toBe(driver.taxId);
  });

  it('should not be able to create a new automobile usage when automobile does not exist', async () => {
    const driver = await Driver.create({
      _id: '12345678910',
      name: 'test',
      taxId: '12345678910',
    });

    const response = await request(app).post(`/usage`).send({
      driver: driver.taxId,
      automobilePlate: '10',
      reason: 'work',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new automobile usage when driver does not exist', async () => {
    const automobile = await Automobile.create({
      _id: '10',
      licensePlate: '10',
      color: 'blue',
      carBrand: 'nissan',
    });

    const response = await request(app).post(`/usage`).send({
      driver: '10',
      automobilePlate: automobile.licensePlate,
      reason: 'work',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new automobile usage if automobile is already being used', async () => {
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

    const driver2 = await Driver.create({
      _id: '12345678911',
      name: 'test2',
      taxId: '12345678911',
    });

    await AutomobileUsage.create({
      driver: driver.taxId,
      automobile: automobile.licensePlate,
      reason: 'work',
    });

    const response = await request(app).post(`/usage`).send({
      driver: driver2.taxId,
      automobilePlate: automobile.licensePlate,
      reason: 'work',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new automobile usage if driver is already using one automobile', async () => {
    const automobile = await Automobile.create({
      _id: '10',
      licensePlate: '10',
      color: 'blue',
      carBrand: 'nissan',
    });

    const automobile2 = await Automobile.create({
      _id: '11',
      licensePlate: '11',
      color: 'black',
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

    const response = await request(app).post(`/usage`).send({
      driver: driver.taxId,
      automobilePlate: automobile2.licensePlate,
      reason: 'work',
    });

    expect(response.status).toBe(400);
  });
});
