import OrderServices from '../ordersDashboard';

const service = new OrderServices();

describe('OrderQueries Tests', () => {
  describe('activeOrder method', () => {
    it('order is defined and status is active', async () => {
      const order = await service.activeOrder(1);
      expect(order).toBeDefined();
      expect(order.status).toBe('active');
    });

    it("order_products is empty array when order doesn'n have products", async () => {
      const order = await service.activeOrder(1);
      expect(order.order_products).toEqual([]);
    });

    it('order_products is array of order_products and each includes product', async () => {
      const order = await service.activeOrder(2);
      const orderProduct = order.order_products;
      expect(orderProduct.length).toBeGreaterThanOrEqual(2);
      expect(orderProduct[0].quantity).toEqual(1);
      expect(orderProduct[0].product).toBeDefined();
      expect(orderProduct[0].product.name).toBeDefined();
      expect(orderProduct[0].product.id).toBeDefined();
    });
  });

  describe('getOrderByUserIdMethod', () => {
    it('returns array of orders', async () => {
      const orders = await service.getOrdersByUserId(2);
      expect(orders instanceof Array).toBeTrue();
    });

    it('id, user_id. status and order_products are defined in each order', async () => {
      const orders = await service.getOrdersByUserId(2);
      expect(orders[0].id).toBeDefined();
      expect(orders[0].user_id).toBeDefined();
      expect(orders[0].status).toBeDefined();
    });

    it('quantity is defined in each product_order', async () => {
      const orders = await service.getOrdersByUserId(2);
      expect(orders[0].order_products instanceof Array).toBeTrue();
      expect(orders[0].order_products[0].quantity).toBeDefined();
    });

    it('product(id, name, price) is defined in each order_product', async () => {
      const orders = await service.getOrdersByUserId(2);
      const product = orders[0].order_products[0].product;
      expect(product).toBeDefined();
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
    });
  });

  describe('completedOrders method tests', () => {
    it('order status is completed in each order', async () => {
      const orders = await service.completedOrders(2);
      orders.forEach(order => expect(order.status).toBe('completed'));
    });
  });
});
