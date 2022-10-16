/* Replace with your SQL commands */

CREATE TABLE orders (
  id SERIAL PRIMARY KEY, 
  user_id INTEGER NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES users(id), 
  status BOOLEAN DEFAULT false
);

CREATE INDEX ON orders(user_id);