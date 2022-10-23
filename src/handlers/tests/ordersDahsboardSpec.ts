import supertest from 'supertest';
import { Order } from '../../models/order';
import { app } from '../../server';
import { jwtSign } from '../../utils/jwt_tokens';

const request = supertest(app);
const userToken = jwtSign({ id: 1, username: 'leomessi' });

describe('/order-services endpoint tests', () => {
  const endpoint = '/order-services/orders-by-user-id';
  describe('/order-services/orders-by-user-id/:userId [GET] endpoint', () => {
    it('401 with invalid auth headers', async () => {
      const res = await request.get(endpoint + '/1');
      expect(res.statusCode).toBe(401);
    });
    it('200 response with array of orders', async () => {
      const res = await request
        .get(endpoint + '/1')
        .set('Authorization', 'Bearer ' + userToken);

      expect(res.body instanceof Array).toBeTrue();
      expect(res.status).toBe(200);
    });

    it("422 when user id doesn't exists", async () => {
      const res = await request
        .get(endpoint + '/100')
        .set('Authorization', 'Bearer ' + userToken);

      expect(res.status).toBe(422);
      expect(res.body.message).toEqual('No user matches id: 100');
    });

    it('orders belongs to provided user_id', async () => {
      const res = await request
        .get(endpoint + '/1')
        .set('Authorization', 'Bearer ' + userToken);

      const orders = res.body;
      orders.forEach((order: Order) => {
        expect(order.user_id).toBe(1);
      });
    });
  });

  describe('/order-services/orders-by-user-id/:userId/active [GET] endpoint', () => {
    it('401 with no valid auth headers', async () => {
      const res = await request.get(endpoint + '/1/active');

      expect(res.status).toBe(401);
    });
    it('200 and order status is active', async () => {
      const res = await request
        .get(endpoint + '/1/active')
        .set('Authorization', 'Bearer ' + userToken);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('active');
      expect(res.body.user_id).toBe(1);
    });
  });

  describe('/order-services/orders-by-user-id/:userId/completed [GET] endpoint', () => {
    it('401 with invalid auth token', async () => {
      const res = await request.get(endpoint + '/1/completed');
      expect(res.statusCode).toBe(401);
    });
    it('200 and array of orders with status is completed', async () => {
      const res = await request
        .get(endpoint + '/1/completed')
        .set('Authorization', 'Bearer ' + userToken);

      const orders = res.body;
      expect(res.status).toBe(200);
      expect(orders instanceof Array).toBe(true);
      orders.forEach((order: Order) => {
        expect(order.status).toBe('completed');
      });
    });
  });
});