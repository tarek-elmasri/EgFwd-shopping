import { Application, Response, Request } from 'express';
import OrderStore from '../models/order';

const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const orders = await new OrderStore().index(userId);
    res.json({ orders });
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message,
    });
  }
};

const orders_routes = (app: Application): void => {
  app.get('/orders/:userId', getOrders);
};

export default orders_routes;
