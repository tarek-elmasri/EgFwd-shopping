export const isInt = (value: any) =>
  typeof value === 'number' && (value + '').split('.').length === 1;
