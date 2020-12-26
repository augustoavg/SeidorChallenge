import request from 'supertest';
import Automobile from '../../infra/mongoose/schemas/Automobile';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import app from '../../../../app';

describe('Find a automobile by license plate - Integration', () => {
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

    await Automobile.create(automobileData);

    const response = await request(app).get(
      `/automobile/${automobileData.licensePlate}`,
    );

    expect(response.status).toBe(200);
    expect(response.body.licensePlate).toBe(automobileData.licensePlate);
  });

  it('should not be able to find a automobile by license plate if it does not exist', async () => {
    const response = await request(app).get(`/automobile/1`);

    expect(response.status).toBe(400);
  });
});
