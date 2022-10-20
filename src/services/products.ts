import { Product } from "../models/product"
import { dbQuery } from "../utils/db_query"


class ProductQueries {

  mostPopular = async()=> {

  }

  orderByCategory = async(category: string): Promise<Product[]> => {
    const query = 'SELECT * FROM products WHERE "category" = ($1)'
    const products = await dbQuery(query, [category])
    return products.rows
  }
}

export default ProductQueries