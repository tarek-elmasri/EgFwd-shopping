import validator from '..';
import { authUserSchema } from '../validatorSchems/users';
import { createIdsSchema } from '../validatorSchems/ids';
import { createUserSchema } from '../validatorSchems/users';
import { createProductSchema } from '../validatorSchems/products';

describe('validator lib tests', () => {
  const invalidAuthParams = {
    username: 'tarek',
    password: 12345,
  };

  const validAuthParams = {
    username: 'tarek',
    password: '12345',
  };

  const validCreateUserSchema = {
    username: 'Bob',
    firstName: 'bob',
    lastName: 'weck',
    password: '12345',
  };

  const validCreateProductSchema = {
    name: 'cc',
    price: '900.99',
  };

  const invalidCreateProductSchema = {
    name: 'bb',
    price: '90c',
  };

  const idSchema = createIdsSchema(['id']);

  it('isValid and errors to be defined', async () => {
    const results = await validator(invalidAuthParams, authUserSchema);
    expect(results.isValid).toBeDefined();
    expect(results.errors).toBeDefined();
  });

  it('isValid to be false with invalid params',async () => {
    expect((await validator(invalidAuthParams, authUserSchema)).isValid).toBeFalse();
    expect(
      (await validator(invalidAuthParams, authUserSchema)).errors?.password?.length,
    ).toBeGreaterThan(0);

    expect((await validator({ id: 'abc' }, idSchema)).isValid).toBeFalse();
    
    expect(
      (await validator(invalidCreateProductSchema, createProductSchema)).isValid,
    ).toBeFalse();
    expect((await validator({}, createUserSchema)).isValid).toBeFalse();
  });

  it('isValid to be true and errors is null with have valid params ',async () => {
    expect((await validator(validAuthParams, authUserSchema)).isValid).toBeTrue();
    expect((await validator(validAuthParams, authUserSchema)).errors).toBeNull();
    expect((await validator({ id: '555' }, idSchema)).isValid).toBeTrue();
    expect((await validator({ id: 4 }, idSchema)).isValid).toBeTrue();
    
    expect(
      (await validator(validCreateUserSchema, createUserSchema)).isValid,
    ).toBeTrue();
    expect(
      (await validator(validCreateProductSchema, createProductSchema)).isValid,
    ).toBeTrue();
  });
});
