import supertest from 'supertest';
import { app } from '../../server';

const request = supertest(app);

describe('/orders endpoints handler tests', () => {
  it('/orders/:userId [GET] 200 response', async () => {
    const res = await request.get('/orders/100');
    expect(res.statusCode).toBe(200);
    expect(res.body.orders).toEqual([]);
  });
});
