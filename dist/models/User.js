"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../services/db");
const schema_1 = require("../schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Date.now().toString();
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
            const record = {
                id,
                fields: [
                    ['name', user.name],
                    ['email', user.email],
                    ['password', hashedPassword]
                ]
            };
            const result = yield db_1.DatabaseService.createRecord(schema_1.UserSchemaName, record);
            if (!result)
                throw new Error(result);
            return Object.assign(Object.assign({ id }, user), { password: hashedPassword });
        });
    }
    static findByEmail(email) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.DatabaseService.searchByField(schema_1.UserSchemaName, 'email', email);
            if (!result || result.length === 0)
                return null;
            const record = result[0];
            return {
                id: record.id,
                name: ((_a = record.fields.find(f => f[0] === 'name')) === null || _a === void 0 ? void 0 : _a[1]) || '',
                email: ((_b = record.fields.find(f => f[0] === 'email')) === null || _b === void 0 ? void 0 : _b[1]) || '',
                password: ((_c = record.fields.find(f => f[0] === 'password')) === null || _c === void 0 ? void 0 : _c[1]) || ''
            };
        });
    }
}
exports.UserModel = UserModel;
