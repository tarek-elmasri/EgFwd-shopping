import { QueryResult } from 'pg';
import { OrderStatus } from '../models/order';
import orderSerializer, { ExtendedOrder } from '../serializers/orders';
import { dbQuery } from '../utils/db_query';

class OrderQueries {
  activeOrder = async (userId: number): Promise<ExtendedOrder> => {
    const result = (await this.getOrdersByUserId(userId, 'active'))[0];

    // if no results returns from inner joins
    // that means current order doesn't have products included
    // therefore another order query is required
    if (result) return result;

    const query = 'SELECT * FROM orders WHERE "user_id" = ($1)';
    const order = await dbQuery(query, [userId]);
    return { ...order.rows[0], order_products: [] };
  };

  completedOrders = async (userId: number): Promise<ExtendedOrder[]> => {
    const results = await this.getOrdersByUserId(userId, 'completed');
    return results;
  };

  getOrdersByUserId = async (
    userId: number,
    status?: OrderStatus,
  ): Promise<ExtendedOrder[]> => {
    let query: string;
    let results: QueryResult;
    const queryParams: (string | number)[] = [userId];

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

export default OrderQueries;
