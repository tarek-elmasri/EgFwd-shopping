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
  recordExists?: (id: number)=> Promise<boolean>
};

type ValidatorSchema<T> = {
  fieldName: keyof T;
  options: ValidatorOption;
};

type ValidatorResult = {
  isValid: boolean;
  hasMissingParams: boolean
  errors: Record<string, string[]> | null;
};

type ValidatorObject = {
  [key: string]: string | number;
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
const validator = async<T>(
  object: ValidatorObject,
  schema: Schema<T>,
): Promise<ValidatorResult> => {
  const errors: Record<string, string[]> = {};
  let hasMissingParams = false

  let key: keyof T;
  let type: keyof ValidatorTypeOptions | undefined;

  // helper method for pushin errors in errors variable
  const pushError = (errorKey: keyof T, message: string) => {
    errors[errorKey as string]
      ? errors[errorKey as string].push(message)
      : (errors[errorKey as string] = [message]);
  };

  // mapping schema options
  //schema.forEach((schemaObject: ValidatorSchema<T>) => {
    let schemaObject: ValidatorSchema<T>
  for (schemaObject of schema){
    // checking fieldname absence in object if required
    key = schemaObject.fieldName;
    if (schemaObject.options.required && !object[key as string]){
      pushError(key, `${key as string} is required field`);
      hasMissingParams = true
      continue
    }

    // checking strings and booleans types
    type = schemaObject.options.type;
    if (
      type &&
      object[key as string] &&
      (type === 'string' || type === 'boolean') &&
      !(typeof object[key as string] === type)
    )
      pushError(key, `${key as string} must be ${type}`);

    // checking step for numbers
    if (
      type &&
      object[key as string] &&
      type === 'number' &&
      !isNumber(object[key as string] as unknown as string)
    )
      pushError(key, `${key as string} must be ${type}`);

    // extra checking step for integers
    if (
      type &&
      object[key as string] &&
      type === 'integer' &&
      !isInt(object[key as string] as unknown as string)
    )
      pushError(key, `${key as string} must be ${type}`);
      
    // recordExists check
    const recordExists = schemaObject.options.recordExists 
    const targetId = object[schemaObject.fieldName] as number
    if (recordExists && (isInt(targetId)) && !(await recordExists(targetId)))
      pushError(key, `${key as string} must be ${type}`);

  }

  

  // formatting result
  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    hasMissingParams,
    errors: isValid ? null : errors,
  };
};

export { Schema, ValidatorResult };
export default validator;
