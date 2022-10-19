import { dbQuery } from '../utils/db_query';

export type Order = {
  id?: number;
  status?: 'active' | 'completed';
  user_id?: number;
};

export type OrderProduct = {
  order_id?: number;
  product_id?: number;
  quantity?: number;
};

class OrderStore {
  index = async (userId: number): Promise<Order[] | null> => {
    try {
      let query: string;
      // making sure user exists
      query = 'SELECT 1 FROM users WHERE "id" = ($1)';
      const userExists = await dbQuery(query, [userId]);
      if (userExists.rowCount === 0) return null;

      // fetching user's orders
      query = 'SELECT * FROM orders WHERE "user_id" = ($1)';
      const results = await dbQuery(query, [userId]);
      return results.rows;
    } catch (error) {
      throw new Error(
        `Error occured while fetching order from databas with userId; ${userId}`,
      );
    }
  };

  show = async (id: number): Promise<Order> => {
    try {
      const query = 'SELECT * FROM orders WHERE "id" = ($1)';
      const results = await dbQuery(query, [id]);
      return results.rows[0];
    } catch (error) {
      throw new Error(
        `Error occured while fetching order from database with id: ${id}`,
      );
    }
  };

  create = async (
    userId: number,
    status: 'active' | 'completed' = 'active',
  ): Promise<Order> => {
    try {
      const query =
        'INSERT INTO orders (user_id, status) VALUES ($1,$2) RETURNING *';
      const results = await dbQuery(query, [userId, status]);
      return results.rows[0];
    } catch (error) {
      throw new Error(
        `Error occured while creating order with params userId: ${userId} & status: ${status}`,
      );
    }
  };

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
