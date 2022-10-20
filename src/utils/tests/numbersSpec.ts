import { isInt, isNumber } from '../numbers';

describe('numbers util functions tests', () => {
  describe('isInt utils function', () => {
    it('return boolean', () => {
      expect(typeof isInt(1) === 'boolean').toBeTrue();
      expect(typeof isInt('abc') === 'boolean').toBeTrue();
    });

    it('true with valid integer', () => {
      expect(isInt('1')).toBeTrue();
    });

    it('false with floats', () => {
      expect(isInt(1.5)).toBeFalse();
    });
  });

  describe('isNumber utils tests', () => {
    it('return boolean', () => {
      expect(typeof isNumber(1) === 'boolean').toBeTrue();
      expect(typeof isNumber('abc') === 'boolean').toBeTrue();
    });

    it('true with valid number', () => {
      expect(isNumber('1')).toBeTrue();
    });

    it('false with invalid numbers', () => {
      expect(isNumber('1.5a')).toBeFalse();
    });
  });
});
