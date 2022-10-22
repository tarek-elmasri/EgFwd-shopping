import { Application, Request, Response } from 'express';
import ProductsServices from '../services/productsDashboard';

const productsByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.query.category;

    const products = await new ProductsServices().orderByCategory(
      category as string | undefined,
    );

    res.json(products);
  } catch (error) {
    res.status(422).json({ message: (error as Error).message });
  }
};

const mostPopular = async (req: Request, res: Response) => {
  try {
    const products = await new ProductsServices().mostPopular();
    res.json(products);
  } catch (error) {
    res.status(422).json({ message: (error as Error).message });
  }
};

const productsDashboardRoutes = (app: Application) => {
  app.get('/products-services/by-category', productsByCategory);
  app.get('/products-services/most-popular', mostPopular);
};

export default productsDashboardRoutes;
