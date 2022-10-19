import { Schema } from '..';
import { Product } from '../../../models/product';

export const createProductSchema: Schema<Product> = [
  {
    fieldName: 'name',
    options: {
      required: true,
      type: 'string',
    },
  },
  {
    fieldName: 'price',
    options: {
      required: true,
      type: 'number',
    },
  },
  {
    fieldName: 'category',
    options: {
      type: 'string',
    },
  },
];
