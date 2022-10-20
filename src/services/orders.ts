import { QueryResult } from 'pg';
import { Order, OrderStatus } from '../models/order';
import { dbQuery } from '../utils/db_query';

class OrderServices {
  getOrdersByUserId = async (
    userId: number,
    status?: OrderStatus,
  ): Promise<Order[]> => {
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
    return results.rows;
  };
}

export default OrderServices;
