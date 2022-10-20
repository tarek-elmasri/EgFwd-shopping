export const isInt = (value: any) =>
  isNumber(value) && (value + '').split('.').length === 1;

export const isNumber = (value: string | number) =>
  !isNaN(value as number) && !isNaN(parseFloat(value as string));
