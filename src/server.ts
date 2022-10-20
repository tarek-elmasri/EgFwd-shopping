import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import users_routes from './handlers/users';
import products_routes from './handlers/products';
import ordersRoutes from './handlers/orders';

export const app: express.Application = express();

const PORT = process.env.PORT || 3000;

const address: string = `localhost:${PORT}`;
const corsConfigurations = {
  origin: '127.0.0.1',
};

app.use(cors(corsConfigurations));
app.use(bodyParser.json());

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World');
});

users_routes(app);
products_routes(app);
ordersRoutes(app);

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});
