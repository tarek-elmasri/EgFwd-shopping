import { Application, Request, Response } from 'express';
import { ordersDashboardParamsSchema } from '../libs/validator/validatorSchems/ordersDashboard';
import authenticated from '../middlewares/authenticated';
import { paramsValidator } from '../middlewares/validator';
import UserService from '../services/ordersDashboard';

const userOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.user_id);
    const orders = await new UserService().getOrdersByUserId(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const userCurrentOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.user_id);
    const order = await new UserService().activeOrder(userId);
    if (order) res.json(order);
    else
      res.status(404).json({ message: 'No active attached to this user yet' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const userCompletedOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.user_id);
    const orders = await new UserService().completedOrders(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const ordersDashboardRoutes = (app: Application) => {

  app.get(
    '/order-services/orders-by-user-id/:user_id',
    authenticated,
    paramsValidator(ordersDashboardParamsSchema),
    userOrders,
  );
  app.get(
    '/order-services/orders-by-user-id/:user_id/active',
    authenticated,
    paramsValidator(ordersDashboardParamsSchema),
    userCurrentOrder,
  );
  app.get(
    '/order-services/orders-by-user-id/:user_id/completed',
    authenticated,
    paramsValidator(ordersDashboardParamsSchema),
    userCompletedOrders,
  );
};

export default ordersDashboardRoutes;
