import { Application, Response, Request } from 'express';
import ProductStore from '../models/product';

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await new ProductStore().index();
    res.json({ products });
  } catch (error) {
    res.status(422).json({
      message: (error as Error).message,
    });
  }
};

const showProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    const product = await new ProductStore().show(parseInt(productId));
    res.json(product);
  } catch (error) {
    res.status(400).json({
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
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const products_routes = (app: Application): void => {
  app.get('/products', getProducts);
  app.get('/products/:id', showProduct);
  app.post('/products', createProduct);
};

export default products_routes;
