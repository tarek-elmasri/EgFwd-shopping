/* Replace with your SQL commands */

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL, 
  quantity INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE INDEX ON order_items(product_id);
CREATE INDEX ON order_items(order_id);
