import { Order, OrderStatus } from '../models/order';
import UserStore from '../models/user';
import { dbQuery } from '../utils/db_query';

class OrderServices {
  getOrdersByUserId = async (
    userId: number,
    status?: OrderStatus,
  ): Promise<Order[]> => {
      let query: string
      let queryParams: (string | number)[] = [userId];
      
      // ensure user exists
      query = 'SELECT 1 FROM users WHERE "id" = ($1)'
      const user = await dbQuery(query, queryParams)
      if (user.rowCount === 0 ) throw new Error(`Invalid userId. No user matches id: ${userId}`)

      // fetching user orders
      query = `select * FROM orders WHERE "user_id" = ($1) ${
        status ? 'AND "status" = ($2)' : ''
      }`;
      if (status) queryParams.push(status);

      const results = await dbQuery(query, queryParams);
      return results.rows;
    
  };
}

export default OrderServices;
