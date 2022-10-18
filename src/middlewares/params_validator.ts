import { NextFunction, Request, Response } from 'express';

interface ValidatorTypeOptions{
  string: 'string',
  integer: 'integer',
  number: 'number',
  boolean: 'boolean'
}
export type ValidatorOption ={
  required?: boolean;
  type?: keyof ValidatorTypeOptions
};

export type ValidatorSchema<T> = {
  fieldName: keyof T;
  options: ValidatorOption;
};


const isInt = (value: any) => (typeof value === 'number') && ((value + '').split('.').length === 1)

/**
 * basic validator function as a middleware to validate requests body parameters.
 * takes array of ValidatorSchema<T>
 * @example  validateBodyParams<User>([
 *  {
 *    fieldName: 'username',
 *    options: {
 *      required: true,
 *      type: 'string'
 *    }
 *  }
 * ])
 * @param schema 
 * @returns void
 */
export const validateBodyParams =
  <T>(schema: ValidatorSchema<T>[]) =>
  (req: Request, res: Response, next: NextFunction) => {

    let errors: {
      [key: string]: string[];
    }={}

    let key: keyof T;
    let type: keyof ValidatorTypeOptions | undefined
    const params = req.body;

    const pushError = (errorKey: keyof T, message: string ) => {
      errors[errorKey as string]
        ? errors[errorKey as string].push(message)
        : errors[errorKey as string] = [message];
    }

    schema.forEach(schemaObject => {
      key = schemaObject.fieldName;
      if (schemaObject.options.required && !params[key]) 
        pushError(key,`${key as string} is required field`)

      
      type = schemaObject.options.type
      if (type && (type=== 'string' || type=== 'boolean' || type=== 'number') &&  !(typeof params[key] === type))
        pushError(key,`${key as string} must be ${type}`)
       

      if (type && type === 'integer' && !(isInt(params[key])))
        pushError(key, `${key as string} must be ${type}`)
        
    });

    if (Object.keys(errors).length > 0)
      res.status(400).json({message: 'Invalid Parameters' , errors})
    else
      next()

  };
