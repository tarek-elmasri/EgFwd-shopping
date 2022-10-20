import { Application, Request, Response } from 'express';
import { bodyValidator, paramsValidator } from '../middlewares/validator';
import {
  authUserSchema,
  createUserSchema,
} from '../libs/validator/validatorSchems/users';
import UserStore from '../models/user';
import { jwtSign } from '../utils/jwt_tokens';
import OrderServices from '../services/orders';
import { createIdsSchema } from '../libs/validator/validatorSchems/ids';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await new UserStore().index();
    res.status(200).json(users);
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message,
    });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, firstName, lastName, password } = req.body;

    const user = await new UserStore().create(
      username,
      firstName,
      lastName,
      password,
    );

    const token = jwtSign(user);

    res.status(201).json({ ...user, token });
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message,
    });
  }
};
const authUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await new UserStore().authenticate(username, password);

    if (user) res.status(200).json(user);
    else
      res.status(404).json({
        message: 'No User Found',
      });
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message,
    });
  }
};

const getCompletedOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const orders = await new OrderServices().OrdersByUserId(
      userId,
      'completed',
    );

    res.json(orders);
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message,
    });
  }
};

const getCurrentOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const order = await new OrderServices().getCurrentOrderByUserId(userId);

    res.json(order);
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message,
    });
  }
};

const users_routes = (app: Application) => {
  app.get('/users', getUsers);
  app.post('/users', bodyValidator(createUserSchema), createUser);
  app.post('/users/auth', bodyValidator(authUserSchema), authUser);
  app.get(
    '/users/:userId/order', // current order
    paramsValidator(createIdsSchema(['userId'])),
    getCurrentOrder,
  );
  app.get(
    '/users/:userId/orders', // completed orders
    paramsValidator(createIdsSchema(['userId'])),
    getCompletedOrders,
  );
};

export default users_routes;
