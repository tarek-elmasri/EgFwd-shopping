import ProductStore from '../product';

describe('ProductStore tests', () => {
  const store = new ProductStore();

  it('index method is defined', () => {
    expect(store.index).toBeDefined();
  });

  it('show method to be defined', () => {
    expect(store.show).toBeDefined();
  });

  it('create method to be defined', () => {
    expect(store.create).toBeDefined();
  });

  it('index method to return list of products', async () => {
    const products = await store.index();
    expect(products instanceof Array).toBeTrue();
    expect(products.length).toBeGreaterThanOrEqual(5);
  });

  it('show to return product with product id argument', async () => {
    const product = await store.show(1);
    expect(product).toBeDefined();
    expect(product?.id).toEqual(1);
    expect(product?.name).toBeDefined();
    expect(product?.price).toBeDefined();
  });

  it('create method to return new product', async () => {
    const guitar = await store.create('guitar', 100.99, 'music');

    expect(guitar.id).toBeTruthy();
    expect(guitar.name).toEqual('guitar');
    expect(guitar.price).toEqual(100.99);
  });
});
