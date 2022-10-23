import { Schema } from '..';
import OrderStore, { OrderProduct } from '../../../models/order';
import ProductStore from '../../../models/product';

export const createOrderProductBodySchema: Schema<OrderProduct> = [
  {
    fieldName: 'product_id',
    options: {
      required: true,
      type: 'integer',
      recordExists: async(id: number) => (!!await new ProductStore().show(id))
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

export const createOrderProductParamsSchema: Schema<OrderProduct> = [
  {
    fieldName: 'order_id',
    options: {
      required: true,
      type: 'integer',
      recordExists: async(id: number)=> (!! await new OrderStore().show(id))
    }
  }
]