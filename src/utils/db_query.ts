import { QueryResult } from 'pg';
import Client from '../database';

/**
 * a shortcut for database connection, performing query
 * and releasing connection
 * @param query: string
 * @param params: (string | number | null)[]
 * @returns Promise<QueryResult>
 */
export const dbQuery = async (
  query: string,
  params?: (string | number | null)[],
): Promise<QueryResult<any>> => {
  const connection = await Client.connect();
  const results = await connection.query(query, params);
  connection.release();
  return results;
};
