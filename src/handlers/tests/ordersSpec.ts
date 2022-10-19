import supertest from 'supertest';
import UserStore from '../../models/user';
import { app } from '../../server';

const request = supertest(app);

describe('/orders endpoints handler tests', () => {
  it('/orders/:userId [GET] 404 response with invalid userId', async () => {
    const res = await request.get('/orders/100');
    expect(res.statusCode).toBe(404);
  });

  it('/orders/:userId [GET] 200 response with valid userId', async () => {
    const user = await new UserStore().create(
      'tarek',
      'tarek',
      'elmasri',
      '12345',
    );
    const res = await request.get(`/orders/${user.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
