import bcrypt from 'bcrypt';
import { dbQuery } from '../utils/db_query';

export type User = {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

const PEPPER = process.env.PEPPER;
const SALT_ROUNDS = process.env.SALT_ROUNDS;

class UserStore {
  index = async (): Promise<User[]> => {
    const query = 'SELECT "id", "username", "firstName", "lastName" FROM users';
    const results = await dbQuery(query);
    return results.rows;
  };

  show = async (userId: number): Promise<User | undefined> => {
    const query = `SELECT 
                    "id", "username" , "firstName", "lastName" FROM users
                  WHERE
                    "id" = ($1)  
                  `;
    const results = await dbQuery(query, [userId]);
    return results.rows[0];
  };

  create = async (
    username: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<User> => {
    try {
      const password_digest = await bcrypt.hash(
        password + PEPPER,
        parseInt(SALT_ROUNDS as string),
      );

      const query =
        'INSERT INTO users ("username", "firstName", "lastName", "password_digest") VALUES ($1, $2, $3, $4) RETURNING "username", "firstName", "lastName", "id"';

      const result = await dbQuery(query, [
        username,
        firstName,
        lastName,
        password_digest,
      ]);

      return result.rows[0];
    } catch (error) {
      throw new Error('Error occured while trying to create a user');
    }
  };

  authenticate = async (
    username: string,
    password: string,
  ): Promise<User | null> => {
    try {
      const query = 'SELECT * FROM users WHERE users.username = ($1)';

      const result = await dbQuery(query, [username]);
      const user = result.rows[0];

      if (!user) return null;

      const pass_matches = await bcrypt.compare(
        password + PEPPER,
        user.password_digest,
      );
      if (pass_matches) {
        const userData = {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        return userData;
      } else return null;
    } catch {
      return null;
    }
  };
}

export default UserStore;
