import UserStore from '../user';

describe('UserStore tests', () => {
  const store = new UserStore();

  it('create method to be defined', () => {
    expect(store.create).toBeDefined();
  });

  it('authenticate to be defined', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('index to be defined', () => {
    expect(store.index).toBeDefined();
  });

  it('create method to create and return user', async () => {
    const user = await store.create('user1', 'john', 'doe', '12345');
    expect(user.id).toBeTruthy();
    expect(user.firstName).toBeDefined()
    expect(user.lastName).toEqual('doe')
  });

  it('authenticate to return a user with valid credentials', async () => {
    await store.create('user', 'ipsuem', 'lorem', 'password');
    const user = await store.authenticate('user', 'password');
    expect(user).toBeTruthy();
  });

  it('authenticate to return null with invalid credentials', async () => {
    await store.create('user3', 'jo', 'saja', '12345');
    const user = await store.authenticate('user3', 'aaa');
    expect(user).toBe(null);
  });
});
