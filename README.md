# Shopping App

a basic RESTfull shopping api built with node.js and express

## Installation

- clone repository to your local maching and install dependencies:

```
git clone git@github.com:tarek-elmasri/EgFwd-shopping.git
cd EgFwd-shopping
npm install
```

- install db-migrate globally.

```
npm i -g db-migrate
```

- connect to the default postgres database as the server's root user `psql -U postgres`.
- create a new user by running this command:

```
CREATE USER shopping_user WITH PASSWORD 'password'
```

- create database for both dev and test environment by following command:

```
CREATE DATABASE shopping_dev;
CREATE DATABASE shopping_test;
```

- connect to the database and grant all privileges to new user;

```
  \c shopping_dev;
  GRANT ALL PREIVILEGES ON DATABASE shopping_dev TO shopping_user;
  \c shopping_test;
  GRANT ALL PREIVILEGES ON DATABASE shopping_test TO shopping_user;

```

- database should be running on default psql port: `5432`
- server will be running on port: `3000` unless changed in `.env` file.
- create `.env` file and match fields with `.env-example` fields and referring to database information.
- migrate database schema:

```
db-migrate up
```

- seed some rows in database using following script:

```
npm run dbseed
```

- run server:

```
npm start
```

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

- "/orders/:order_id/products" [POST] -> to add product into an order.
  required data: {
  product_id: number
  }
- "/order-services/orders-by-user-id/:userId" [GET] [token required] -> return orders belongs to given user id

- "/order-services/orders-by-user-id/:userId/active" [GET] [token required] -> return current active order belongs to given user id.

- "/order-services/orders-by-user-id/:userId/completed" [GET] [token required] -> return only completed orders that belongs to given user id.

## Testing

make sure a database for testing is already created and referred in `.env` before running script.

```
ENV=test npm run test
```

## Available scripts:

- `start`: start transpiled version.
- `watch`: start in watch mode for ts.
- `prettier`: for styling code.
- `lint`: for eslint.
- `dbseed`: seeding data into database.
- `test`: testing.
