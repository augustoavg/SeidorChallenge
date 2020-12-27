import request from 'supertest';
import Driver from '../../infra/mongoose/schemas/Driver';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import app from '../../../../app';

describe('Find a driver by tax name - Integration', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Driver.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to find a driver by name', async () => {
    const driverData = {
      _id: '12345678910',
      taxId: '12345678910',
      name: 'test',
    };

    await Driver.create(driverData);

    const response = await request(app)
      .get(`/driver`)
      .send({
        data: { name: driverData.name },
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should be able to find all drivers', async () => {
    const driverData = {
      _id: '12345678910',
      taxId: '12345678910',
      name: 'test',
    };

    const driverData2 = {
      _id: '12345678911',
      taxId: '12345678911',
      name: 'test2',
    };

    await Driver.create(driverData);
    await Driver.create(driverData2);

    const response = await request(app).get(`/driver`).send({
      data: {},
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('should not be able to find a driver that does not exists', async () => {
    const response = await request(app)
      .get(`/driver`)
      .send({
        data: { name: 'test' },
      });

    expect(response.status).toBe(400);
  });
});
