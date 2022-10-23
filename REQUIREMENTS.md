## Api Endpoints

### Users:

- "/users" [POST] -> create new user and return user data and a token.
  required data: {
  username: string, firsName: string, lastName: string, password: string
  }

- "/users/auth" [POST] -> authenticate user and return user data with a token.
  required data: {
  username: string,
  password: string
  }

- "/users" [GET] : [token required] -> get list of users.

- "/users/:id" [GET] : [token required], -> return user data.

### Products:

- "/products" [GET] -> get list of all products.
- "products/:id" [GET] -> get product referring to the id.
- "/products" [POST] : [token required] -> create new product.
  required data: {
  name: string,
  price: float,
  category: string (optional)
  }
- "/products-services/by-category?category='category'" [GET] -> to get products belongs to specific category. if no category is passed in query it will return all products ordered by category
- "/products-services/most-popular" [GET] -> get heighest top 5 sold product

### Orders:

- "/orders/:order_id/products" [POST] [token required] -> to add product into an order.
  required data: {
  product_id: number
  }
- "/order-services/orders-by-user-id/:userId" [GET] [token required] -> return orders belongs to given user id

- "/order-services/orders-by-user-id/:userId/active" [GET] [token required] -> return current active order belongs to given user id.

- "/order-services/orders-by-user-id/:userId/completed" [GET] [token required] -> return only completed orders that belongs to given user id.

## Database Schema

### User

- `id`: [SERIAL PRIMARY KEY]
- `username`: VARCHAR NOT NULL
- `firstName`: VARCHAR NOT NULL
- `lastName`: VARCHAR NOT NULL
- `password_digest`: VARCHAR NOT NULL

### Product

- `id`: [SERIAL PRIMARY KEY]
- `name`: VARCHAR NOT NULL
- `price`: FLOAR NOT NULL
- `category`: VARCHAR

### Order

- `id`: [SERIAL PRIMARY KEY]
- `status`: VARCHAR
- `user_id`: INTEGER FORIEGN KEY refrence to users id

### Order Product

- `id`: [SERIAL PRIMARY KEY]
- `quantity`: INTEGER NOT NULL
- `order_id`: INTEGER FORIEGN KEY refrence to orders id
- `product_id`: INTEGER FORIEGN KEY refrence to products id
