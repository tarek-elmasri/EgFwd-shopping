import supertest from 'supertest';
import { app } from '../../server';

const request = supertest(app);

describe('/orders endpoints handler tests', () => {
  it('/orders [GET] 200 with response of orders list', async () => {
    const res = await request.get('/orders');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([])
  });

});
