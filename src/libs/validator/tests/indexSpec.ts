import validator from '..';
import { authUserSchema } from '../validatorSchems/users';

describe('validator lib tests', () => {
  const invalidAuthParams = {
    username: 'tarek',
    password: 12345,
  };

  const validAuthParams = {
    username: 'tarek',
    password: '12345',
  };

  it('isValid and errors to be defined', () => {
    const results = validator(invalidAuthParams, authUserSchema);
    expect(results.isValid).toBeDefined();
    expect(results.errors).toBeDefined();
  });

  it('isValid to be false with invalid auth params', () => {
    expect(validator(invalidAuthParams, authUserSchema).isValid).toBeFalse();
    expect(
      validator(invalidAuthParams, authUserSchema).errors?.password?.length,
    ).toBeGreaterThan(0);
  });

  it('isValid to be true with valid params and errors is null', () => {
    expect(validator(validAuthParams, authUserSchema).isValid).toBeTrue();
    expect(validator(validAuthParams, authUserSchema).errors).toBeNull();
  });
});
