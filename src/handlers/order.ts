import { Application, Response, Request } from 'express';
import OrderStore from '../models/order';

const getOrdersByUserId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId) || undefined;
    const orders = await new OrderStore().index(userId!);
    if (orders) res.json(orders);
    else
      res.status(404).json({
        message: 'Not Found',
        errors: {
          userId: 'invalid userId',
        },
      });
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message,
    });
  }
};

const orders_routes = (app: Application): void => {
  app.get('/orders/:userId', getOrdersByUserId);
};

export default orders_routes;
