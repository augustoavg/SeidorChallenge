import request from 'supertest';
import Driver from '../../infra/mongoose/schemas/Driver';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import app from '../../../../app';

describe('Update a driver - Integration', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Driver.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to update a driver', async () => {
    const driverData = {
      _id: '12345678910',
      taxId: '12345678910',
      name: 'test',
    };

    await Driver.create(driverData);

    const response = await request(app)
      .post(`/driver/${driverData.taxId}`)
      .send({ name: 'new test' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('new test');
  });

  it('should not be able to update a driver if does not exists', async () => {
    const response = await request(app)
      .post(`/driver/1`)
      .send({ name: 'test' });

    expect(response.status).toBe(400);
  });
});
