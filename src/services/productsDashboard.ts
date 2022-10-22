import { Product } from '../models/product';
import { dbQuery } from '../utils/db_query';

class ProductQueries {
  mostPopular = async (): Promise<(Product & { sales: number })[]> => {
    const query = `SELECT 
                      "order_products"."product_id" as id, "products"."name", 
                      "products"."price", SUM("order_products"."quantity") as sales
                    FROM order_products
                    INNER JOIN 
                      products ON "order_products"."product_id" = "products"."id"
                    GROUP BY
                      "order_products"."product_id", "products"."name", "products"."price"
                    ORDER BY
                      sales DESC
                    LIMIT 5
                  `;

    const results = await dbQuery(query);
    return results.rows;
  };

  orderByCategory = async (category?: string): Promise<Product[]> => {
    let query: string;
    // if no category provided will return all products
    if (category) query = 'SELECT * FROM products WHERE "category" = ($1)';
    else query = 'SELECT * FROM products ORDER BY "category"';
    const products = await dbQuery(query, category ? [category] : undefined);
    return products.rows;
  };
}

export default ProductQueries;
