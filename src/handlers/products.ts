import { Application, Response, Request } from 'express';
import ProductStore from '../models/product';
import {bodyValidator, paramsValidator} from '../middlewares/validator';
import { createProductSchema } from '../libs/validator/validatorSchems/products';
import { createIdsSchema } from '../libs/validator/validatorSchems/ids';

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await new ProductStore().index();
    res.json(products);
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message,
    });
  }
};

const showProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.params.id)

    const product = await new ProductStore().show(productId);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message,
    });
  }
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, category } = req.body;
    const newProduct = await new ProductStore().create(
      name,
      parseFloat(price),
      category,
    );
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message,
    });
  }
};

const products_routes = (app: Application): void => {
  app.get('/products', getProducts);
  app.get('/products/:id', paramsValidator(createIdsSchema(['id'])), showProduct);
  app.post('/products', bodyValidator(createProductSchema), createProduct);
};

export default products_routes;
