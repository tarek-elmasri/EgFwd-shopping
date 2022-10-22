import { Application, Request, Response } from 'express';
import { createIdsSchema } from '../libs/validator/validatorSchems/ids';
import authenticated from '../middlewares/authenticated';
import { paramsValidator } from '../middlewares/validator';
import UserService from '../services/ordersDashboard';

const userOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const orders = await new UserService().getOrdersByUserId(userId);
    res.json(orders);
  } catch (error) {
    res.status(422).json({ message: (error as Error).message });
  }
};

const userCurrentOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const order = await new UserService().activeOrder(userId);
    if (order) res.json(order);
    else
      res.status(404).json({ message: 'No active attached to this user yet' });
  } catch (error) {
    res.status(422).json({ message: (error as Error).message });
  }
};

const userCompletedOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const orders = await new UserService().completedOrders(userId);
    res.json(orders);
  } catch (error) {
    res.status(422).json({ message: (error as Error).message });
  }
};

const ordersDashboardRoutes = (app: Application) => {
  const userIdSchema = createIdsSchema(['userId']);

  app.get(
    '/order-services/orders-by-user-id/:userId',
    authenticated,
    paramsValidator(userIdSchema),
    userOrders,
  );
  app.get(
    '/order-services/orders-by-user-id/:userId/active',
    authenticated,
    paramsValidator(userIdSchema),
    userCurrentOrder,
  );
  app.get(
    '/order-services/orders-by-user-id/:userId/completed',
    authenticated,
    paramsValidator(userIdSchema),
    userCompletedOrders,
  );
};

export default ordersDashboardRoutes;
