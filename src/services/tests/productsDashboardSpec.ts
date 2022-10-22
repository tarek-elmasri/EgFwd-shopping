import ProductService from '../productsDashboard';

const service = new ProductService();
describe('ProductQueries tests', () => {
  describe('mostPopular tests', () => {
    it('return array of products and of maximum length of 5', async () => {
      const products = await service.mostPopular();
      expect(products instanceof Array).toBeTrue();
      expect(products.length).toBeLessThanOrEqual(5);
      products.forEach(product => {
        expect(product.id).toBeDefined();
        expect(product.name).toBeDefined();
        expect(product.sales).toBeDefined();
      });
    });

    it('products order by highest sales desc', async () => {
      const products = await service.mostPopular();
      products.forEach((product, i) => {
        if (products[i + 1])
          expect(parseInt(product.sales as unknown as string)).toBeGreaterThan(
            parseInt(products[i + 1].sales as unknown as string),
          );
      });
    });
  });

  describe('orderByCategory tests', () => {
    it('products with given category', async () => {
      const products = await service.orderByCategory('games');
      products.forEach(product => {
        expect(product.category).toEqual('games');
      });
    });
  });
});
