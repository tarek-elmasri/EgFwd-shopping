import UserStore, { User } from './models/user';
import ProductStore, { Product } from './models/product';
import OrderStore, { Order, OrderStatus } from './models/order';

const usersSeeds: User[] = [
  {
    username: 'jrnymar',
    firstName: 'jrnymar',
    lastName: 'nymar',
    password: '12345',
  },
  {
    username: 'leomessi',
    firstName: 'leo',
    lastName: 'messi',
    password: '12345',
  },
];

const productsSeeds: Product[] = [
  {
    name: 'iphone',
    price: 66.66,
    category: 'phones',
  },
  {
    name: 'galaxy s11',
    price: 44.44,
    category: 'phones',
  },
  {
    name: 'playstation 5',
    price: 1000.99,
    category: 'games',
  },
  {
    name: 'xbox',
    price: 1200.99,
    category: 'games',
  },
  {
    name: 'istore card',
    price: 100.0,
  },
];

const ordersSeeds: Order[] = [
  {
    user_id: 1,
  },
  {
    user_id: 1,
    status: 'completed',
  },
  {
    user_id: 2,
  },
  {
    user_id: 2,
    status: 'completed',
  },
  {
    user_id: 1,
    status: 'completed',
  },
];

const seed = async () => {
  console.log(`env: ${process.env.ENV} - seeding data to database ...`);

  let queryObject: unknown;
  for (queryObject of usersSeeds) {
    await new UserStore().create(
      (queryObject as User).username as string,
      (queryObject as User).firstName as string,
      (queryObject as User).lastName as string,
      (queryObject as User).password as string,
    );
  }

  for (queryObject of productsSeeds) {
    await new ProductStore().create(
      (queryObject as Product).name as string,
      (queryObject as Product).price as number,
      (queryObject as Product).category,
    );
  }

  for (queryObject of ordersSeeds) {
    await new OrderStore().create(
      (queryObject as Order).user_id as number,
      (queryObject as Order).status as OrderStatus,
    );
  }

  await new OrderStore().addProduct(2, 1, 1);
  await new OrderStore().addProduct(2, 2, 4);
  await new OrderStore().addProduct(3, 3, 1);
  await new OrderStore().addProduct(3, 4, 6);
  await new OrderStore().addProduct(4, 3, 3);
  await new OrderStore().addProduct(4, 5, 1);
  await new OrderStore().addProduct(4, 1, 2);
  await new OrderStore().addProduct(5, 3, 7);
  await new OrderStore().addProduct(5, 4, 2);
};
seed();
process.on('beforeExit', () => console.log('seeded successfully'));
