import { QueryResult } from 'pg';
import { Order, OrderProduct, OrderStatus } from '../models/order';
import { Product } from '../models/product';
import orderSerializer from '../serializers/orders';
import { dbQuery } from '../utils/db_query';

type ExtendedOrderProduct = OrderProduct & {
  product: Product;
};
export type ExtendedOrder = Order & {
  order_products: ExtendedOrderProduct[];
};

class OrderServices {
  getCurrentOrderByUserId = async (userId: number): Promise<ExtendedOrder> => {
    const results = await this.OrdersByUserId(userId, 'active');
    return orderSerializer(results)[0];
  };

  OrdersByUserId = async (
    userId: number,
    status?: OrderStatus,
  ): Promise<ExtendedOrder[]> => {
    let query: string;
    let results: QueryResult<any>;
    let queryParams: (string | number)[] = [userId];

    // check user exists
    query = 'SELECT 1 FROM users WHERE "id" = ($1)';
    results = await dbQuery(query, queryParams);
    if (results.rowCount === 0)
      throw new Error(`No user matches id: ${userId}`);

    // fetching order
    query = `SELECT "orders"."id", "orders"."status", "orders"."user_id", "order_products"."quantity",
              "order_products"."order_id", "products"."id" as product_id, "products"."name", "products"."price" 
              FROM orders 
              INNER JOIN 
                order_products ON "order_products"."order_id" = "orders"."id" 
              INNER JOIN 
                products ON "products"."id" = "order_products"."product_id" 
              WHERE "orders"."user_id" = ($1)
              ${status ? ' AND "orders"."status" = ($2)' : ''}
              `;
    if (status) queryParams.push(status);
    results = await dbQuery(query, queryParams);
    return orderSerializer(results.rows);
  };
}

export default OrderServices;
