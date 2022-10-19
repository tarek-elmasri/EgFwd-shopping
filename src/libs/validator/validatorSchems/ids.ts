import { Schema } from "..";


export const idsSchema: Schema<any> = [
  {
    fieldName: 'id',
    options: {
      required: true,
      type: 'integer',
    },
  },
];

export const createIdsSchema = (idKeys: string[]) => {
  let schema: Schema<any> = []
  idKeys.forEach(idKey => {
    schema.push({
      fieldName: idKey,
      options: {
        required: true,
        type: 'integer'
      }
    })
  })

  return schema
}