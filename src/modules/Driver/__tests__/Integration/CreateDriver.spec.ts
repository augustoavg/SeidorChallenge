import request from 'supertest';
import Driver from '../../infra/mongoose/schemas/Driver';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import app from '../../../../app';

describe('Create a new driver - Integration', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Driver.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to create a new driver', async () => {
    const driverData = {
      taxId: '12345678910',
      name: 'teste',
    };

    const response = await request(app).post(`/driver`).send(driverData);

    expect(response.status).toBe(200);
    expect(response.body.taxId).toBe(driverData.taxId);
  });

  it('should not be able to create a driver if already exists', async () => {
    const driverData = {
      taxId: '12345678910',
      name: 'teste',
    };

    await Driver.create(driverData);

    const response = await request(app).post(`/driver`).send(driverData);

    expect(response.status).toBe(400);
  });
});
