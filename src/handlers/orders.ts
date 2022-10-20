import { Application, Response, Request } from 'express';
import { createOrderProductSchema } from '../libs/validator/validatorSchems/createOrderProductSchema';
import { createIdsSchema } from '../libs/validator/validatorSchems/ids';
import { bodyValidator, paramsValidator } from '../middlewares/validator';
import OrderStore from '../models/order';

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {product_id: productId , quantity} = req.body
    const orderId = parseInt(req.params.order_id)

    const orderProduct = await new OrderStore().addProduct(
      orderId,
      parseInt(productId),
      parseInt(quantity)
    )

    res.json(orderProduct)
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message
    })
  }

};

const ordersRoutes = (app: Application): void => {
  app.post(
    '/orders/:order_id/products',
    bodyValidator(createOrderProductSchema),
    paramsValidator(createIdsSchema(['order_id'])),
    addProduct,
  );
};

export default ordersRoutes;
