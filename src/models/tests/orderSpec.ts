import OrderStore from '../order';
import ProductStore from '../product';
import UserStore from '../user';

describe('OrderStore tests', () => {
  const store = new OrderStore();

  it('index method is defined', () => {
    expect(store.index).toBeDefined();
  });

  it('create method is defined', () => {
    expect(store.show).toBeDefined();
  });

  it('create method is defined', () => {
    expect(store.create).toBeDefined();
  });

  it('index method to return list of orders', async () => {
    const orders = await store.index();
    expect(orders).toEqual([]);
  });

  it('show order to return order', async () => {
    const user = await new UserStore().create('makkah', 'mo', 'salah', '12345');
    const newOrder = await store.create(user.id!);
    const order = await store.show(newOrder.user_id!);
    expect(order).toBeTruthy();
    expect(order.id).toEqual(newOrder.id);
  });

  it('create order with userId to return new order', async () => {
    const user = await new UserStore().create('makkah', 'mo', 'salah', '12345');

    const order = await store.create(user.id!);
    expect(order).toBeTruthy();
    expect(order.status).toEqual('active');
  });

  it('addProduct method is defined', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('addProduct to return an order_product new record', async () => {
    const user = await new UserStore().create(
      'mosalah',
      'mo',
      'salah',
      '12345',
    );
    const product = await new ProductStore().create('PS5', 1000, 'games');
    const order = await store.create(user.id!);
    const orderProduct = await store.addProduct(order.id!, product.id!, 1);
    expect(orderProduct).toBeTruthy();
    expect(orderProduct.order_id).toEqual(order.id);
    expect(orderProduct.quantity).toEqual(1);
    expect(orderProduct.product_id).toEqual(product.id);
  });
});
