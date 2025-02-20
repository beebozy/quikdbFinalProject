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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../services/db");
const schema_1 = require("../schema");
class OrderModel {
    static create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Date.now().toString();
            const record = {
                id,
                fields: [
                    ['description', order.description],
                    ['status', order.status],
                    ['userId', order.userId]
                ]
            };
            const result = yield db_1.DatabaseService.createRecord(schema_1.OrderSchemaName, record);
            // Type guard: if the result contains 'err', it is an error.
            if ('err' in result) {
                throw new Error(result.err);
            }
            // If the result doesn't have 'err', it should have 'ok'
            if (!result.ok) {
                throw new Error("Record creation failed");
            }
            return Object.assign({ id }, order);
        });
    }
    static listByUser(userId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield db_1.DatabaseService.searchByField(schema_1.OrderSchemaName, 'userId', userId);
            // Manual pagination
            const start = (page - 1) * limit;
            const end = start + limit;
            return records.slice(start, end).map(record => {
                var _a, _b, _c;
                return ({
                    id: record.id,
                    description: ((_a = record.fields.find(f => f[0] === 'description')) === null || _a === void 0 ? void 0 : _a[1]) || '',
                    status: (_b = record.fields.find(f => f[0] === 'status')) === null || _b === void 0 ? void 0 : _b[1],
                    userId: ((_c = record.fields.find(f => f[0] === 'userId')) === null || _c === void 0 ? void 0 : _c[1]) || ''
                });
            });
        });
    }
}
exports.OrderModel = OrderModel;
