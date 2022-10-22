import supertest from 'supertest';
import { Product } from '../../models/product';
import { app } from '../../server';

const request = supertest(app);

const endpoint = '/products-services';
describe('/products-services endpoint test', () => {
  describe('/by-category endpoint', () => {
    it('/by-category?category=phones [GET] 200 response', async () => {
      const res = await request.get(endpoint + '/by-category?category=phones');
      expect(res.status).toBe(200);
      expect(res.body instanceof Array).toBe(true);
      res.body.forEach((product: Product) => {
        expect(product.category).toEqual('phones');
      });
    });
  });

  describe('/most-popular', () => {
    it('/200 res with products list', async () => {
      const res = await request.get(endpoint + '/most-popular');
      expect(res.status).toBe(200);
      expect(res.body instanceof Array).toBeTrue();
    });
  });
});
