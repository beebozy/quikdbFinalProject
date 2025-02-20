"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// User Schema
exports.UserSchemaName = 'UserSchema';
exports.UserSchemaFields = [
    { name: 'name', fieldType: 'Text', unique: false },
    { name: 'email', fieldType: 'Text', unique: true },
    { name: 'password', fieldType: 'Text', unique: false }
];
exports.UserSchemaIndexes = ['email'];
exports.CreateUserSchemaArgs = [
    exports.UserSchemaName,
    exports.UserSchemaFields,
    exports.UserSchemaIndexes
];
// Order Schema
exports.OrderSchemaName = 'OrderSchema';
exports.OrderSchemaFields = [
    { name: 'description', fieldType: 'Text', unique: false },
    { name: 'status', fieldType: 'Text', unique: false },
    { name: 'userId', fieldType: 'Text', unique: false }
];
exports.CreateOrderSchemaArgs = [
    exports.OrderSchemaName,
    exports.OrderSchemaFields,
    ['userId'] // Index by user ID
];
