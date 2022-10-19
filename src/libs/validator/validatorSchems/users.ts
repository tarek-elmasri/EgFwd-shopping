import { Schema } from '..';
import { User } from '../../../models/user';

export const authUserSchema: Schema<User> = [
  {
    fieldName: 'username',
    options: { required: true, type: 'string' },
  },
  {
    fieldName: 'password',
    options: { required: true, type: 'string' },
  },
];

export const createUserSchema: Schema<User> = [
  {
    fieldName: 'username',
    options: {
      required: true,
      type: 'string',
    },
  },
  {
    fieldName: 'firstName',
    options: {
      required: true,
      type: 'string',
    },
  },
  {
    fieldName: 'lastName',
    options: {
      required: true,
      type: 'string',
    },
  },
  {
    fieldName: 'password',
    options: {
      required: true,
      type: 'string',
    },
  },
];
