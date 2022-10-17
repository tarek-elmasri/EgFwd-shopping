import { dbQuery } from '../utils/db_query';

export type Order = {
  id?: number;
  status?: 'active' | 'completed';
  user_id?: number;
};

class OrderStore {
  index = async (): Promise<Order[]> => {
    try {
      const query = 'SELECT * FROM orders';
      const results = await dbQuery(query);
      return results.rows;
    } catch (error) {
      throw new Error('Error occured while fetching order from database');
    }
  };

  show = async (userId: number): Promise<Order> => {
    try {
      const query =
        'SELECT * FROM orders WHERE orders.user_id = ($1) AND orders.status = ($2)';
      const results = await dbQuery(query, [userId, 'active']);
      return results.rows[0];
    } catch (error) {
      throw new Error(
        `Error occured while fetching order from database with userId: ${userId} and status: active`,
      );
    }
  };
}

export default OrderStore;
