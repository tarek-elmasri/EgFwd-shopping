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
  index = async (): Promise<Order[]> => {
    try {
      const query = 'SELECT * FROM orders';
      const results = await dbQuery(query);
      return results.rows;
    } catch (error) {
      throw new Error(
        `Error occured while fetching order from database`,
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
