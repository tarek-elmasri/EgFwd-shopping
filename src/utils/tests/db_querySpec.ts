import { dbQuery } from '../db_query';

describe('db_query util function test', () => {
  const query = 'SELECT * FROM users';

  it('db_query to run db query and return results', async () => {
    const results = await dbQuery(query);
    expect(results).toBeDefined();
  });
});
