import { NextFunction, Request, Response } from 'express';
import validator, { Schema } from '../libs/validator';

/**
 * utilize validator library to validate body params
 *  with provided schema
 * @param schema: Schema
 *
 */
const paramsValidator =
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

export default paramsValidator;
