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
  async(req: Request, res: Response, next: NextFunction) => {
    const { errors, isValid, hasMissingParams } = await validator(req.params, schema);

    if (isValid) next();
    else hasMissingParams ?
      res.status(400).json({
        message: 'Bad Parameter',
        errors,
      }) :
      res.status(422).json({message: 'Unprocessable Entity' , errors})
  };

/**
 * a middleware to utilize validator library for body validations
 *  with provided schema
 * @param schema: Schema
 *
 */
const bodyValidator =
  <T>(schema: Schema<T>) =>
  async(req: Request, res: Response, next: NextFunction) => {
    const { errors, isValid ,hasMissingParams } = await validator(req.body, schema);

    if (isValid) next();
    else hasMissingParams ?
      res.status(400).json({
        message: 'Bad Parameter',
        errors,
      }) : 
      res.status(422).json({message: 'Unprocessable Entity' , errors})
  };
export { paramsValidator, bodyValidator };

export default {
  paramsValidator,
  bodyValidator,
};
