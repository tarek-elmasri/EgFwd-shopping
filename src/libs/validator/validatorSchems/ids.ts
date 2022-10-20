import { Schema } from '..';

export const idsSchema: Schema<any> = [
  {
    fieldName: 'id',
    options: {
      required: true,
      type: 'integer',
    },
  },
];

/**
 * helper method to create validator schema for id params
 * to be used in paramsValidators
 * @param idKeys : string[]
 * @returns : Schema
 */
export const createIdsSchema = (idKeys: string[]) => {
  let schema: Schema<any> = [];
  idKeys.forEach(idKey => {
    schema.push({
      fieldName: idKey,
      options: {
        required: true,
        type: 'integer',
      },
    });
  });

  return schema;
};
