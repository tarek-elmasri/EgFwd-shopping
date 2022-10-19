import UserStore, { User } from './models/user';
import ProductStore, { Product } from './models/product';
import OrderStore, { Order } from './models/order';

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
];

const seed = async () => {
  let queryObject;
  for (queryObject of usersSeeds) {
    await new UserStore().create(
      (queryObject as User).username!,
      (queryObject as User).firstName!,
      (queryObject as User).lastName!,
      (queryObject as User).password!,
    );
  }

  for (queryObject of productsSeeds) {
    await new ProductStore().create(
      (queryObject as Product).name!,
      (queryObject as Product).price!,
      (queryObject as Product).category,
    );
  }

  for (queryObject of ordersSeeds) {
    await new OrderStore().create((queryObject as Order).user_id!);
  }
};

seed().then(() => console.log('seeds succeeded'));
