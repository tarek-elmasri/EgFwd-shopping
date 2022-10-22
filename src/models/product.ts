import { dbQuery } from '../utils/db_query';

export type Product = {
  id?: number;
  name?: string;
  price?: number;
  category?: string;
};

class ProductStore {
  index = async (): Promise<Product[]> => {
    const query = 'SELECT * FROM products';

    const results = await dbQuery(query);

    return results.rows;
  };

  show = async (productId: number): Promise<Product | undefined> => {
    const query = 'SELECT * FROM products WHERE products.id = ($1)';

    const results = await dbQuery(query, [productId]);

    return results.rows[0];
  };

  create = async (
    name: string,
    price: number,
    category?: string,
  ): Promise<Product> => {
    const query =
      'INSERT INTO products (name, price, category) VALUES($1,$2,$3) RETURNING *';

    const result = await dbQuery(query, [
      name,
      price,
      category ? category : null,
    ]);

    return result.rows[0];
  };
}

export default ProductStore;
