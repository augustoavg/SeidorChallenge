import request from 'supertest';
import Automobile from '../../infra/mongoose/schemas/Automobile';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import app from '../../../../app';

describe('Create a new automobile - Integration', () => {
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

    const response = await request(app)
      .post(`/automobile`)
      .send(automobileData);

    expect(response.status).toBe(200);
    expect(response.body.licensePlate).toBe(automobileData.licensePlate);
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

    const response = await request(app)
      .post(`/automobile`)
      .send(automobileData);

    expect(response.status).toBe(400);
  });
});
