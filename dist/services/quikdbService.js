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
const sdk_1 = require("quikdb-cli-beta/v1/sdk");
class QuikDBService {
    constructor() {
        this.quikdb = new sdk_1.QuikDB();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.quikdb.init();
            // Optionally, create schemas if they do not exist.
            // Example: CreateSchema for 'UserSchema' and 'OrderSchema'
        });
    }
    // User record operations
    createUserRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = ['UserSchema', record];
            return yield this.quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateRecordData, args);
        });
    }
    getUserRecord(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = ['UserSchema', username];
            const result = yield this.quikdb.callCanisterMethod(sdk_1.CanisterMethod.GetRecord, args);
            if (result.ok)
                return result.ok;
            return null;
        });
    }
    // Order record operations
    createOrderRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = ['OrderSchema', record];
            return yield this.quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateRecordData, args);
        });
    }
    getOrderRecord(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = ['OrderSchema', orderId];
            const result = yield this.quikdb.callCanisterMethod(sdk_1.CanisterMethod.GetRecord, args);
            if (result.ok)
                return result.ok;
            return null;
        });
    }
    getAllOrderRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            const args = ['OrderSchema'];
            const result = yield this.quikdb.callCanisterMethod(sdk_1.CanisterMethod.GetAllRecords, args);
            if (result.ok)
                return result.ok;
            return [];
        });
    }
    updateOrderRecord(orderId, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = ['OrderSchema', orderId, fields];
            return yield this.quikdb.callCanisterMethod(sdk_1.CanisterMethod.UpdateData, args);
        });
    }
    deleteOrderRecord(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = ['OrderSchema', orderId];
            return yield this.quikdb.callCanisterMethod(sdk_1.CanisterMethod.DeleteRecord, args);
        });
    }
}
exports.default = new QuikDBService();
