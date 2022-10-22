import OrderStore from '../order';

describe('OrderStore tests', () => {
  const store = new OrderStore();

  it('index method is defined', () => {
    expect(store.index).toBeDefined();
  });

  it('show method is defined', () => {
    expect(store.show).toBeDefined();
  });

  it('create method is defined', () => {
    expect(store.create).toBeDefined();
  });

  it('addProduct method is defined', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('index method to return list of orders', async () => {
    const orders = await store.index();
    expect(orders instanceof Array).toBeTrue();
    expect(orders.length).toEqual(5);
  });

  it('show method to return order', async () => {
    const order = await store.show(1);
    expect(order).toBeDefined();
    expect(order?.id).toEqual(1);
    expect(order?.user_id).toBeDefined();
    expect(order?.status).toBeDefined();
  });

  it('create order with userId to return new order', async () => {
    const order = await store.create(1);
    expect(order).toBeDefined();
    expect(order.status).toEqual('active');
    expect(order.user_id).toBe(1);
  });

  it('create order to throw error with invalid userId', async () => {
    await expectAsync(store.create(100)).toBeRejectedWithError(
      'No user matches id: 100',
    );
  });

  it('addProduct method is defined', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('addProduct to return an order_product new record', async () => {
    const productId = 1;
    const orderId = 2;
    const quantity = 2;
    const orderProduct = await store.addProduct(orderId, productId, quantity);
    expect(orderProduct).toBeDefined();
    expect(orderProduct.order_id).toEqual(orderId);
    expect(orderProduct.quantity).toEqual(quantity);
    expect(orderProduct.product_id).toEqual(productId);
  });

  it('addProduct to throw error with invalid orderId', async () => {
    await expectAsync(store.addProduct(100, 1, 1)).toBeRejectedWithError(
      'No order matches orderId: 100',
    );
  });

  it('addProduct to throw error with invalid productId', async () => {
    await expectAsync(store.addProduct(1, 100, 1)).toBeRejectedWithError(
      'No product matches productId: 100',
    );
  });

  it('addProduct to throw error with invalid quantity', async () => {
    await expectAsync(store.addProduct(1, 1, -10)).toBeRejectedWithError(
      'Invalid quantity',
    );
  });
});
