import { Pool } from "pg";

const {
  DB_HOST: host,
  DB_Name: database,
  DB_USER: user,
  DB_PASSWORD: password,
} = process.env;

const client = new Pool({
  host,
  database,
  user,
  password,
});

export default client;
