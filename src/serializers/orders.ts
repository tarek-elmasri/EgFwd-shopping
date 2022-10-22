// TODO : create test

import { Order, OrderProduct, OrderStatus } from '../models/order';
import { Product } from '../models/product';

type ExtendedOrderProduct = OrderProduct & {
  product: Product;
};
export type ExtendedOrder = Order & {
  order_products: ExtendedOrderProduct[];
};

/**
 * mimic a serializer for joined tables of orders
 * @returns ExtendedOrder[]
 */
const orderSerializer = (
  orderRaws: Record<string, string | number>[],
): ExtendedOrder[] => {
  if (orderRaws.length === 0) return [];
  const ordersObj: { [key: number]: ExtendedOrder } = {};
  orderRaws.forEach(raw => {
    if (!ordersObj[raw.id as number]) {
      ordersObj[raw.id as number] = {
        id: raw.id as number,
        user_id: raw.user_id as number,
        status: raw.status as OrderStatus,
        order_products: [],
      };

      orderRaws
        .filter(order => order.id === raw.id)
        .forEach(order_product => {
          ordersObj[raw.id as number] = {
            ...ordersObj[raw.id as number],
            order_products: [
              ...ordersObj[raw.id as number].order_products,
              {
                quantity: order_product.quantity as number,
                product: {
                  id: order_product.product_id as number,
                  name: order_product.name as string,
                  price: order_product.price as number,
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
