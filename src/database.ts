import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let client: Pool;

if (process.env.ENV === 'dev') {
  client = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
} else {
  client = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME_TEST,
    user: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
  });
}

export default client;
