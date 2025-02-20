import { Field, CreateSchemaArgs } from 'quikdb-cli-beta/v1/sdk';

// User Schema


export const UserSchemaName = 'UserSchema';
export const UserSchemaFields: Field[] = [
  { name: 'name', fieldType: 'Text', unique: false },
  { name: 'email', fieldType: 'Text', unique: true },
  { name: 'password', fieldType: 'Text', unique: false }
];
export const UserSchemaIndexes = ['email'];
export const CreateUserSchemaArgs: CreateSchemaArgs = [
  UserSchemaName,
  UserSchemaFields,
  UserSchemaIndexes
];

// Order Schema
export const OrderSchemaName = 'OrderSchema';
export const OrderSchemaFields: Field[] = [
  { name: 'description', fieldType: 'Text', unique: false },
  { name: 'status', fieldType: 'Text', unique: false },
  { name: 'userId', fieldType: 'Text', unique: false }
];
export const CreateOrderSchemaArgs: CreateSchemaArgs = [
  OrderSchemaName,
  OrderSchemaFields,
  ['userId'] // Index by user ID
];