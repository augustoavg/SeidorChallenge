import request from 'supertest';
import Driver from '../../infra/mongoose/schemas/Driver';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import app from '../../../../app';

describe('Find a driver by tax id - Integration', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Driver.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to find a driver', async () => {
    const driverData = {
      taxId: '12345678910',
      name: 'test',
    };

    await Driver.create(driverData);

    const response = await request(app).get(`/driver/${driverData.taxId}`);

    expect(response.status).toBe(200);
    expect(response.body.taxId).toBe(driverData.taxId);
  });

  it('should not be able to find a driver that does not exists', async () => {
    const response = await request(app).get(`/driver/1`);

    expect(response.status).toBe(400);
  });
});
