/* Replace with your SQL commands */

CREATE TABLE orders (
  id SERIAL PRIMARY KEY, 
  status VARCHAR(10),
  user_id INTEGER NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES users(id) 
);

CREATE INDEX ON orders(user_id);