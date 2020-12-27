import request from 'supertest';
import Automobile from '../../infra/mongoose/schemas/Automobile';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import app from '../../../../app';

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

    await Automobile.create({
      _id: '10',
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    });

    const automobileUpdateData = {
      color: 'black',
      carBrand: 'nissan',
    };

    const response = await request(app)
      .post(`/automobile/${automobileData.licensePlate}`)
      .send(automobileUpdateData);

    expect(response.status).toBe(200);
    expect(response.body.licensePlate).toBe(automobileData.licensePlate);
  });

  it('should not be able to update a automobile that does not exist', async () => {
    const automobileUpdateData = {
      color: 'black',
      carBrand: 'nissan',
    };

    const response = await request(app)
      .post(`/automobile/${1}`)
      .send(automobileUpdateData);

    expect(response.status).toBe(400);
  });
});
