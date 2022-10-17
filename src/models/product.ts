import { dbQuery } from '../utils/db_query';

export type Product = {
  id?: number;
  name?: string;
  price?: number;
  category?: string;
};

class ProductStore {
  index = async (): Promise<Product[]> => {
    try {
      const query = 'SELECT * FROM products';

      const results = await dbQuery(query);

      return results.rows;
    } catch (error) {
      throw new Error('Error occured while fetching products from database');
    }
  };

  show = async (productId: number): Promise<Product> => {
    try {
      const query = 'SELECT * FROM products WHERE products.id = ($1)';

      const results = await dbQuery(query, [productId]);

      return results.rows[0];
    } catch (error) {
      throw new Error(
        `Error occured while fetching product from database with id of ${productId}`,
      );
    }
  };

  create = async (
    name: string,
    price: number,
    category: string,
  ): Promise<Product> => {
    try {
      const query =
        'INSERT INTO products (name, price, category) VALUES($1,$2,$3) RETURNING *';

      const result = await dbQuery(query, [name, price, category]);

      return result.rows[0];
    } catch (error) {
      throw new Error('Error occured while creating new product in database');
    }
  };
}

export default ProductStore;
