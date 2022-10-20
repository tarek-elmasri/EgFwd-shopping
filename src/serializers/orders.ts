// TODO : create test

import { Order } from '../models/order';

/**
 * mimic a serializer for joined tables of orders
 * @returns Order[]
 */
const orderSerializer = (orderRaws: any[]): Order[] => {
  let ordersObj: { [key: number]: Order } = {};
  orderRaws.forEach(raw => {
    if (!ordersObj[raw.id]) {
      ordersObj[raw.id] = {
        id: raw.id,
        user_id: raw.user_id,
        status: raw.status,
        order_products: [],
      };
      orderRaws
        .filter(order => order.id === raw.id)
        .forEach(order_product => {
          ordersObj[raw.id] = {
            ...ordersObj[raw.id],
            order_products: [
              ...ordersObj[raw.id].order_products!,
              {
                quantity: order_product.quantity,
                product: {
                  id: order_product.product_id,
                  name: order_product.name,
                  price: order_product.price,
                },
              },
            ],
          };
        });
    }
  });

  return Object.values(ordersObj);
};

export default orderSerializer;
