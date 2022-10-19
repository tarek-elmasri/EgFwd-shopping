import { isInt } from '../numbers';

describe('isInt utils function', () => {
  it('return boolean', () => {
    expect(typeof isInt(1) === 'boolean').toBeTrue();
    expect(typeof isInt('abc') === 'boolean').toBeTrue();
  });

  it('true with valid integer', () => {
    expect(isInt(1)).toBeTrue();
  });

  it('false with floats', () => {
    expect(isInt(1.5)).toBeFalse();
  });
});
