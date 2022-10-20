import validator from '..';
import { authUserSchema } from '../validatorSchems/users';
import { createIdsSchema } from '../validatorSchems/ids';

describe('validator lib tests', () => {
  const invalidAuthParams = {
    username: 'tarek',
    password: 12345,
  };

  const validAuthParams = {
    username: 'tarek',
    password: '12345',
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
  });

  it('isValid to be true and errors is null with have valid params ', () => {
    expect(validator(validAuthParams, authUserSchema).isValid).toBeTrue();
    expect(validator(validAuthParams, authUserSchema).errors).toBeNull();
    expect(validator({ id: '555' }, idSchema).isValid).toBeTrue();
    expect(validator({ id: 4 }, idSchema).isValid).toBeTrue();
  });
});
