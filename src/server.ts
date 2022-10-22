import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import users_routes from './handlers/users';
import products_routes from './handlers/products';
import ordersRoutes from './handlers/orders';
import ordersDashboardRoutes from './handlers/ordersDashboard';
import productsDashboardRoutes from './handlers/productsDashboard';

export const app: express.Application = express();

const PORT = process.env.PORT || 3000;

const address = `localhost:${PORT}`;
const corsConfigurations = {
  origin: '127.0.0.1',
};

app.use(cors(corsConfigurations));
app.use(bodyParser.json());

users_routes(app);
products_routes(app);
productsDashboardRoutes(app);
ordersRoutes(app);
ordersDashboardRoutes(app);

app.listen(PORT, () => {
  console.log(`starting app on: ${address}`);
});
