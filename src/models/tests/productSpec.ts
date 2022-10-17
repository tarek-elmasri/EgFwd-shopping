import ProductStore from '../product';

describe('ProductStore tests', () => {
  const name = 'item1';
  const price = 99.55;
  const category = 'degital';

  const store = new ProductStore();

  it('index method is defined', () => {
    expect(store.index).toBeDefined();
  });

  it('get method to be defined', () => {
    expect(store.show).toBeDefined();
  });

  it('create method to be defined', () => {
    expect(store.create).toBeDefined();
  });

  // it('update method to be defined', () => {
  //   expect(store.update).toBeDefined();
  // });

  it('create method to return new product', async () => {
    const guitar = await store.create('guitar', 100.99, 'music');

    expect(guitar.id).toBeTruthy();
    expect(guitar.name).toEqual('guitar');
    expect(guitar.price).toEqual(100.99);
  });
});
