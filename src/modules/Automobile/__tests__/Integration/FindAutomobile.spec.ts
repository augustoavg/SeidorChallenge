import request from 'supertest';
import Automobile from '../../infra/mongoose/schemas/Automobile';
import MongoMock from '../../../../shared/__tests__/MongoMock';
import app from '../../../../app';

describe('Find a automobile - Integration', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Automobile.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to find all automobile', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    };

    const automobileData2 = {
      licensePlate: '11',
      color: 'blue',
      carBrand: 'nissan',
    };

    await Automobile.create({
      _id: '10',
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    });
    await Automobile.create({
      _id: '11',
      licensePlate: '11',
      color: 'blue',
      carBrand: 'nissan',
    });

    const response = await request(app).get(`/automobile`).send({ data: {} });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('should be able to find automobile by color', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    };

    const automobileData2 = {
      licensePlate: '11',
      color: 'blue',
      carBrand: 'nissan',
    };

    await Automobile.create({
      _id: '10',
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    });
    await Automobile.create({
      _id: '11',
      licensePlate: '11',
      color: 'blue',
      carBrand: 'nissan',
    });

    const response = await request(app)
      .get(`/automobile`)
      .send({ data: { color: 'blue' } });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('should not be able to find a automobile by carBrand', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    };

    const automobileData2 = {
      licensePlate: '11',
      color: 'blue',
      carBrand: 'nissan',
    };

    await Automobile.create({
      _id: '10',
      licensePlate: '10',
      color: 'blue',
      carBrand: 'fiat',
    });
    await Automobile.create({
      _id: '11',
      licensePlate: '11',
      color: 'blue',
      carBrand: 'nissan',
    });

    const response = await request(app)
      .get(`/automobile`)
      .send({ data: { carBrand: 'nissan' } });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should not be able to find a automobile by carBrand and color', async () => {
    const automobileData = {
      licensePlate: '10',
      color: 'red',
      carBrand: 'nissan',
    };

    const automobileData2 = {
      licensePlate: '11',
      color: 'blue',
      carBrand: 'nissan',
    };

    const automobileData3 = {
      licensePlate: '12',
      color: 'blue',
      carBrand: 'nissan',
    };

    await Automobile.create({
      _id: '10',
      licensePlate: '10',
      color: 'red',
      carBrand: 'nissan',
    });
    await Automobile.create({
      _id: '11',
      licensePlate: '11',
      color: 'blue',
      carBrand: 'nissan',
    });
    await Automobile.create({
      _id: '12',
      licensePlate: '12',
      color: 'blue',
      carBrand: 'nissan',
    });

    const response = await request(app)
      .get(`/automobile`)
      .send({ data: { carBrand: 'nissan', color: 'blue' } });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('should not be able to find a automobile if it does not exist', async () => {
    const response = await request(app)
      .get(`/automobile`)
      .send({ data: { carBrand: 'nissan', color: 'blue' } });

    expect(response.status).toBe(400);
  });
});
