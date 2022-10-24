import supertest from 'supertest';
import { app } from '../../server';

const request = supertest(app);

describe('products endpoints handler tests', () => {
  let token: string;

  beforeAll(async () => {
    const credentials = { username: 'leomessi', password: '12345' };
    const res = await request.post('/users/auth').send(credentials);
    token = res.body.token;
  });

  const newProductParams = {
    name: 'Hugo perfume',
    price: '33.99',
    category: 'perfumes',
  };

  it('/products [GET] 200 status with products list', async () => {
    const res = await request.get('/products');
    expect(res.statusCode).toBe(200);
    expect(res.body instanceof Array).toBeTrue();
    expect(res.body.length).toBeGreaterThanOrEqual(5);
  });

  it('/products [POST] 401 with invalid auth headers', async () => {
    const res = await request.post('/products');
    expect(res.statusCode).toBe(401);
  });

  it('/products [POST] 422 with message and errors defined when passing invalid params', async () => {
    const res = await request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send({ ...newProductParams, price: 'unknown' });

    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBeDefined();
    expect(res.body.errors).toBeDefined();
  });

  it('/products [POST] 201 with product information', async () => {
    const res = await request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send(newProductParams);

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toEqual(newProductParams.name);
    expect(res.body.price).toEqual(33.99);
  });

  it('/products/:id [GET] 200 with product data', async () => {
    const res = await request.get(`/products/1`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual('iphone');
  });

  it('/products/:id [GET] 404 status with message', async () => {
    const res = await request.get('/products/100');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBeDefined();
  });
});
