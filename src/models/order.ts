import { QueryResult } from 'pg';
import { dbQuery } from '../utils/db_query';

export type OrderStatus = 'active' | 'completed';
export type Order = {
  id?: number;
  status?: OrderStatus;
  user_id?: number;
};

export type OrderProduct = {
  order_id?: number;
  product_id?: number;
  quantity?: number;
};

class OrderStore {
  index = async (): Promise<Order[]> => {
    const query = 'SELECT * FROM orders';
    const results = await dbQuery(query);
    return results.rows;
  };

  show = async (orderId: number): Promise<Order | undefined> => {
    const query = 'SELECT * FROM orders WHERE id = ($1)';
    const results = await dbQuery(query, [orderId]);
    return results.rows[0];
  };

  create = async (
    userId: number,
    status: OrderStatus = 'active',
  ): Promise<Order> => {
    let query: string;
    let results: QueryResult;
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

  addProduct = async (
    orderId: number,
    productId: number,
    quantity: number,
  ): Promise<OrderProduct> => {
    let query: string;
    let results: QueryResult;

    // check order exists
    query = 'SELECT 1 FROM orders WHERE "id" = ($1)';
    results = await dbQuery(query, [orderId]);
    if (results.rowCount === 0)
      throw new Error(`No order matches orderId: ${orderId}`);

    // check product exists
    query = 'SELECT 1 FROM products WHERE "id" = ($1)';
    results = await dbQuery(query, [productId]);
    if (results.rowCount === 0)
      throw new Error(`No product matches productId: ${productId}`);

    // validate quantity
    if (quantity < 1) throw new Error('Invalid quantity');

    // create order item
    query =
      'INSERT INTO order_products ("order_id", "product_id" , "quantity") VALUES ($1,$2,$3) RETURNING *';
    results = await dbQuery(query, [orderId, productId, quantity]);
    return results.rows[0];
  };
}

export default OrderStore;
