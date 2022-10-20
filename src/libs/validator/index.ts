import { isInt, isNumber } from '../../utils/numbers';

interface ValidatorTypeOptions {
  string: 'string';
  integer: 'integer';
  number: 'number';
  boolean: 'boolean';
}

type Schema<T> = ValidatorSchema<T>[];

type ValidatorOption = {
  required?: boolean;
  type?: keyof ValidatorTypeOptions;
};

type ValidatorSchema<T> = {
  fieldName: keyof T;
  options: ValidatorOption;
};

type ValidatorResult = {
  isValid: boolean;
  errors: {
    [key: string]: string[];
  } | null;
};

type ValidatorObject = {
  [key: symbol | string]: any;
};

/**
 * function to validate an object with provided schema.
 *
 * @example
 *  // usage
 *  validator<Product>(
 *    {
 *      name: 'iphone',
 *      price: '1000'
 *    },
 *    [
 *      {
 *        fieldName: 'name',
 *        options: {
 *          required: true,
 *          type: 'string'
 *        }
 *      },
 *      {
 *        fieldName: 'price',
 *        options: {
 *          required: true,
 *          type: 'float'
 *        }
 *      },
 *     ]
 * )
 *  // results:
 *  {
 *    isValid: false,
 *    errors: {
 *      price: [
 *        'must be float'
 *      ]
 *    }
 *  }
 *
 * @param schema: Schema<T> // takes a generic model type
 * @returns ValidatorResult
 */
const validator = <T>(
  object: ValidatorObject,
  schema: Schema<T>,
): ValidatorResult => {
  let errors: {
    [key: string]: string[];
  } = {};

  let key: keyof T;
  let type: keyof ValidatorTypeOptions | undefined;

  // helper method for pushin errors in errors variable
  const pushError = (errorKey: keyof T, message: string) => {
    errors[errorKey as string]
      ? errors[errorKey as string].push(message)
      : (errors[errorKey as string] = [message]);
  };

  // mapping schema options
  schema.forEach((schemaObject: ValidatorSchema<T>) => {
    // checking fieldname absence in object if required
    key = schemaObject.fieldName;
    if (schemaObject.options.required && !object[key])
      pushError(key, `${key as string} is required field`);

    // checking strings and booleans types
    type = schemaObject.options.type;
    if (
      type &&
      object[key] &&
      (type === 'string' || type === 'boolean' || type === 'number') &&
      !(typeof object[key] === type)
    )
      pushError(key, `${key as string} must be ${type}`);

    // checking step for integers
    if (type && object[key] && type === 'number' && !isNumber(object[key]))
      pushError(key, `${key as string} must be ${type}`);

    // extra checking step for integers
    if (type && object[key] && type === 'integer' && !isInt(object[key]))
      pushError(key, `${key as string} must be ${type}`);
  });

  // formatting result
  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    errors: isValid ? null : errors,
  };
};

export { Schema, ValidatorResult };
export default validator;
