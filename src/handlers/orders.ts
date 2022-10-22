import { Application, Response, Request } from 'express';
import { createIdsSchema } from '../libs/validator/validatorSchems/ids';
import { createOrderProductSchema } from '../libs/validator/validatorSchems/orderProduct';
import { bodyValidator, paramsValidator } from '../middlewares/validator';
import OrderStore from '../models/order';

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_id, quantity } = req.body;
    const order_id = req.params.order_id as string;

    const orderProduct = await new OrderStore().addProduct(
      parseInt(order_id),
      parseInt(product_id),
      parseInt(quantity),
    );

    res.status(201).json(orderProduct);
  } catch (error) {
    res.status(422).json({ message: (error as Error).message });
  }
};

const ordersRoutes = (app: Application): void => {
  app.post(
    '/orders/:order_id/products',
    paramsValidator(createIdsSchema(['order_id'])),
    bodyValidator(createOrderProductSchema),
    addProduct,
  );
};

export default ordersRoutes;
