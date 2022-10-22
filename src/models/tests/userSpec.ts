import UserStore from '../user';

describe('UserStore tests', () => {
  const store = new UserStore();

  it('index to be defined', () => {
    expect(store.index).toBeDefined();
  });

  it('show to be defined', () => {
    expect(store.show).toBeDefined();
  });

  it('create method to be defined', () => {
    expect(store.create).toBeDefined();
  });

  it('authenticate to be defined', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('index to return list of users', async () => {
    const users = await store.index();
    expect(users instanceof Array).toBeTrue();
    expect(users.length).toBeGreaterThanOrEqual(2);
  });

  it('create method to create and return user', async () => {
    const user = await store.create('user1', 'john', 'doe', '12345');
    expect(user.id).toBeTruthy();
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toEqual('doe');
    expect(user.password).toBeFalsy();
  });

  it('authenticate to return a user with valid credentials', async () => {
    const user = await store.authenticate('leomessi', '12345');
    expect(user).toBeTruthy();
  });

  it('authenticate to return null with invalid credentials', async () => {
    const user = await store.authenticate('jrnymar', 'aaa');
    expect(user).toBe(null);
  });
});
