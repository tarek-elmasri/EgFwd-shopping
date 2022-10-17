import bcrypt from 'bcrypt';
import { dbQuery } from '../utils/db_query';

export type User = {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
};

const PEPPER = process.env.PEPPER;
const SALT_ROUNDS = process.env.SALT_ROUNDS;

class UserStore {
  index = async (): Promise<User[]> => {
    try {
      const query = 'SELECT * FROM users';
      const results = await dbQuery(query);
      return results.rows;
    } catch (error) {
      throw new Error('Error occured while fetching users from database');
    }
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

      const newUser = result.rows[0];
      return newUser;
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
