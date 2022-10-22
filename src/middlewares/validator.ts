import { NextFunction, Request, Response } from 'express';
import validator, { Schema } from '../libs/validator';

/**
 * a middleware to utilize validator library for params validations
 *  with provided schema
 * @param schema: Schema
 *
 */
const paramsValidator =
  <T>(schema: Schema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { errors, isValid } = validator(req.params, schema);

    if (isValid) next();
    else
      res.status(400).json({
        message: 'Bad Parameter',
        errors,
      });
  };

/**
 * a middleware to utilize validator library for body validations
 *  with provided schema
 * @param schema: Schema
 *
 */
const bodyValidator =
  <T>(schema: Schema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { errors, isValid } = validator(req.body, schema);

    if (isValid) next();
    else
      res.status(400).json({
        message: 'Bad Parameter',
        errors,
      });
  };
export { paramsValidator, bodyValidator };

export default {
  paramsValidator,
  bodyValidator,
};
