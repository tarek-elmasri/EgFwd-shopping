import supertest from 'supertest';
import { app } from '../../server';

const request = supertest(app);

describe('/orders endpoints handler tests', () => {
  let token: string;

  beforeAll(async () => {
    const credentials = { username: 'leomessi', password: '12345' };
    const res = await request.post('/users/auth').send(credentials);
    token = res.body.token;
  });

  it('/:order_id/products [POST] 401 with invalid auth headers', async () => {
    const res = await request.post('/orders/3/products');
    expect(res.status).toBe(401);
  });

  it('/:order_id/products [POST] 201 status', async () => {
    const res = await request
      .post('/orders/3/products')
      .set('Authorization', 'Bearer ' + token)
      .send({ product_id: 1, quantity: 10 });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.product_id).toEqual(1);
    expect(res.body.order_id).toEqual(3);
  });

  it('/:order_id/products [POST] 422 status with invalid order_id params', async () => {
    const res = await request
      .post('/orders/cc/products')
      .set('Authorization', 'Bearer ' + token)
      .send({ product_id: 1, quantity: 10 });

    expect(res.status).toEqual(422);
  });

  it("/:order_id/products [POST] 422 when product deosn't exist", async () => {
    const res = await request
      .post('/orders/3/products')
      .set('Authorization', 'Bearer ' + token)
      .send({ product_id: 11, quantity: 10 });

    expect(res.status).toBe(422);
    expect(res.body.message).toBeDefined();
  });
});
