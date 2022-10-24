# Shopping App

a basic RESTfull shopping api built with node.js and express

## Installation

### Installing Packages

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

### Database Setup

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

### Configure Environment

- rename `.env-example` to `.env`

- Update Enviromental variables:

| KEY              | VALUE         | Description                                 |
| ---------------- | ------------- | ------------------------------------------- |
| PORT             | 3000          | Port on which server will be running on     |
| ENV              | dev           | Environment - supports 'dev' and 'test'     |
| DB_HOST_DEV      | 127.0.0.1     | Database host at dev environment            |
| DB_HOST_TEST     | 127.0.0.1     | Database host at test environment           |
| DB_PORT_DEV      | 5432          | Database port at dev environment            |
| DB_PORT_TEST     | 5432          | Database port at test environment           |
| DB_NAME          | shoppping_dev | Database name for dev environment           |
| DB_USER          | shopping_user | Database user at dev environment            |
| DB_PASSWORD      | password      | User password at dev environment            |
| DB_NAME_TEST     | shopping_test | Database name for test environment          |
| DB_USER_TEST     | shopping_user | Database user at test environment           |
| DB_PASSWORD_TEST | password      | User password at test environment           |
| PEPPER           | pepper        | Secret password to use in hashing passwords |
| SALT_ROUNDS      | 10            | Number of salt round in hashing passwords   |
| JWT_SECRET       | jwt           | Secret password for signing jwt tokens      |
| ---------------- | ------------- | ------------------------------------------- |

### Project Setup

- create database schema by running following command in terminal:

```
db-migrate up
```

- seed some data in database using following script:

```
npm run dbseed
```

- run server:

```
npm start
```

## Api Endpoints

### Users:

- `"/users"` [POST] -> create new user and return user data and a token.
  required data: {
  username: string, firsName: string, lastName: string, password: string
  }

- `"/users/auth"` [POST] -> authenticate user and return user data with a token.
  required data: {
  username: string,
  password: string
  }

- `"/users"` [GET] : [token required] -> get list of users.

- `"/users/:id"` [GET] : [token required], -> return user data.

### Products:

- `"/products"` [GET] -> get list of all products.
- `"products/:id"` [GET] -> get product referring to the id.
- `"/products"` [POST] : [token required] -> create new product.
  required data: {
  name: string,
  price: float,
  category: string (optional)
  }
- `"/products-services/by-category?category='category'"` [GET] -> to get products belongs to specific category. if no category is passed in query it will return all products ordered by category
- `"/products-services/most-popular"` [GET] -> get heighest top 5 sold product

### Orders:

- `"/orders/:order_id/products"` [POST] -> to add product into an order.
  required data: {
  product_id: number
  }
- `"/order-services/orders-by-user-id/:userId"` [GET] [token required] -> return orders belongs to given user id

- `"/order-services/orders-by-user-id/:userId/active"` [GET] [token required] -> return current active order belongs to given user id.

- `"/order-services/orders-by-user-id/:userId/completed"` [GET] [token required] -> return only completed orders that belongs to given user id.

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
