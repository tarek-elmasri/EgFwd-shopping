import { Application, Response, Request } from 'express';
import { createOrderProductBodySchema, createOrderProductParamsSchema} from '../libs/validator/validatorSchems/orderProduct';
import authenticated from '../middlewares/authenticated';
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
    res.status(500).json({ message: (error as Error).message });
  }
};

const ordersRoutes = (app: Application): void => {
  app.post(
    '/orders/:order_id/products',
    authenticated,
    paramsValidator(createOrderProductParamsSchema),
    bodyValidator(createOrderProductBodySchema),
    addProduct,
  );
};

export default ordersRoutes;
