import { Schema } from "..";
import { Order } from "../../../models/order";
import UserStore from "../../../models/user";



export const ordersDashboardParamsSchema : Schema<Order> = [
  {
    fieldName: 'user_id',
    options: {
      required: true,
      type: "integer",
      recordExists: async(id: number) => (!! await new UserStore().show(id))
    }
  }
]