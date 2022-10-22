import { Schema } from '..';
import { OrderProduct } from '../../../models/order';

export const createOrderProductSchema: Schema<OrderProduct> = [
  {
    fieldName: 'product_id',
    options: {
      required: true,
      type: 'integer',
    },
  },
  {
    fieldName: 'quantity',
    options: {
      required: true,
      type: 'integer',
    },
  },
];
