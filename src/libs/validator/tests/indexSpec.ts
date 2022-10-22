import validator from '..';
import { authUserSchema } from '../validatorSchems/users';
import { createIdsSchema } from '../validatorSchems/ids';
import { createOrderProductSchema } from '../validatorSchems/orderProduct';
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

  const validAddProductParams = {
    product_id: '1',
    order_id: '1',
    quantity: '1',
  };

  const invalidAddProductParams = {
    product_id: '1b',
    order_id: '1c',
    quantity: '1e',
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

  it('isValid and errors to be defined', () => {
    const results = validator(invalidAuthParams, authUserSchema);
    expect(results.isValid).toBeDefined();
    expect(results.errors).toBeDefined();
  });

  it('isValid to be false with invalid params', () => {
    expect(validator(invalidAuthParams, authUserSchema).isValid).toBeFalse();
    expect(
      validator(invalidAuthParams, authUserSchema).errors?.password?.length,
    ).toBeGreaterThan(0);

    expect(validator({ id: 'abc' }, idSchema).isValid).toBeFalse();
    expect(
      validator(invalidAddProductParams, createOrderProductSchema).isValid,
    ).toBeFalse();
    expect(
      validator(invalidCreateProductSchema, createProductSchema).isValid,
    ).toBeFalse();
    expect(validator({}, createUserSchema).isValid).toBeFalse();
  });

  it('isValid to be true and errors is null with have valid params ', () => {
    expect(validator(validAuthParams, authUserSchema).isValid).toBeTrue();
    expect(validator(validAuthParams, authUserSchema).errors).toBeNull();
    expect(validator({ id: '555' }, idSchema).isValid).toBeTrue();
    expect(validator({ id: 4 }, idSchema).isValid).toBeTrue();
    expect(
      validator(validAddProductParams, createOrderProductSchema).isValid,
    ).toBeTrue();
    expect(
      validator(validCreateUserSchema, createUserSchema).isValid,
    ).toBeTrue();
    expect(
      validator(validCreateProductSchema, createProductSchema).isValid,
    ).toBeTrue();
  });
});
