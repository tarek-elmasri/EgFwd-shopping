import { Application, Request, Response } from 'express';
import { bodyValidator, paramsValidator } from '../middlewares/validator';
import {
  authUserSchema,
  createUserSchema,
} from '../libs/validator/validatorSchems/users';
import UserStore from '../models/user';
import { jwtSign } from '../utils/jwt_tokens';
import OrderServices from '../services/orders';
import { OrderStatus } from '../models/order';
import { createIdsSchema } from '../libs/validator/validatorSchems/ids';
import orderSerializer from '../serializers/orders';

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

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const { status } = req.query;

    if (status && !['active', 'completed'].includes(status as string))
      throw new Error('status should be one of active or completed.');

    const orders = await new OrderServices().getOrdersByUserId(
      userId,
      status as OrderStatus,
    );

    res.json(orderSerializer(orders));
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message,
    });
  }
};

const addProductToOrder = async (req: Request, res: Response) => {};

const users_routes = (app: Application) => {
  app.get('/users', getUsers);
  app.post('/users', bodyValidator(createUserSchema), createUser);
  app.post('/users/auth', bodyValidator(authUserSchema), authUser);
  app.get(
    '/users/:userId/orders',
    paramsValidator(createIdsSchema(['userId'])),
    getUserOrders,
  );
  app.post(
    '/users/:userId/orders',
    paramsValidator(createIdsSchema(['userId'])),
    addProductToOrder,
  );
};

export default users_routes;
