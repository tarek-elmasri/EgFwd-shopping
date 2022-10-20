import { QueryResult } from 'pg';
import { dbQuery } from '../utils/db_query';
import { Product } from './product';

export type OrderStatus = 'active' | 'completed';
export type Order = {
  id?: number;
  status?: OrderStatus;
  user_id?: number;
  order_products?: OrderProduct[];
};

export type OrderProduct = {
  order_id?: number;
  product_id?: number;
  quantity?: number;
  product?: Product;
};

class OrderStore {
  index = async (): Promise<Order[]> => {
    const query = 'SELECT * FROM orders';
    const results = await dbQuery(query);
    return results.rows;
  };

  create = async (
    userId: number,
    status: 'active' | 'completed' = 'active',
  ): Promise<Order> => {
    let query: string;
    let results: QueryResult<any>;
    // ensure user exists
    query = 'SELECT 1 FROM users WHERE "id" = ($1)';
    results = await dbQuery(query, [userId]);
    if (results.rowCount === 0)
      throw new Error(`No user matches id: ${userId}`);

    // create order
    query = 'INSERT INTO orders (user_id, status) VALUES ($1,$2) RETURNING *';
    results = await dbQuery(query, [userId, status]);
    return results.rows[0];
  };

  // show = async (userId: number, status?: OrderStatus): Promise<Order[]> => {
  //   let query: string;
  //   let results: QueryResult<any>;
  //   let queryParams: (string | number)[] = [userId];

  //   // check user exists
  //   query = 'SELECT 1 FROM users WHERE "id" = ($1)';
  //   results = await dbQuery(query, queryParams);
  //   if (results.rowCount === 0)
  //     throw new Error(`No user matches id: ${userId}`);

  //   // fetching order
  //   query = `SELECT "orders"."id", "orders"."status", "orders"."user_id", "order_products"."quantity",
  //             "order_products"."order_id", "products"."id" as product_id, "products"."name", "products"."price"
  //             FROM orders
  //             INNER JOIN
  //               order_products ON "order_products"."order_id" = "orders"."id"
  //             INNER JOIN
  //               products ON "products"."id" = "order_products"."product_id"
  //             WHERE "orders"."user_id" = ($1)
  //             ${status ? ' AND "orders"."status" = ($2)' : ''}
  //             `;
  //   if (status) queryParams.push(status);
  //   results = await dbQuery(query, queryParams);
  //   return results.rows;
  // };

  addProduct = async (
    orderId: number,
    productId: number,
    quantity: number,
  ): Promise<OrderProduct> => {
    try {
      const query =
        'INSERT INTO order_products ("order_id", "product_id" , "quantity") VALUES ($1,$2,$3) RETURNING *';

      const result = await dbQuery(query, [orderId, productId, quantity]);
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Error occured while creating order product with params orderId: ${orderId}, productId: ${productId}, quantity: ${quantity}`,
      );
    }
  };
}

export default OrderStore;
