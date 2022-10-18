import supertest from 'supertest';
import { app } from '../../server';

const request = supertest(app);

describe('products endpoints handler tests', () => {
  const newProductParams = {
    name: 'Hugo perfume',
    price: 33.99,
    category: 'perfumes',
  };

  let productId: number;

  it('/products [GET] 200 status with products list', async () => {
    const res = await request.get('/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.products).toBeDefined();
  });

  it('/products [POST] 201 with product information', async () => {
    const res = await request.post('/products').send(newProductParams);
    productId = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toEqual(newProductParams.name);
  });

  it('/products/:id [GET] 200 with product data', async () => {
    const res = await request.get(`/products/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual(newProductParams.name);
  });
});
