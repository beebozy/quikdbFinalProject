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
const schema_1 = require("../schema");
const quikdb = new sdk_1.QuikDB();
class DatabaseService {
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield quikdb.init();
            // Create schemas if they don't exist
            yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, schema_1.CreateUserSchemaArgs);
            yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, schema_1.CreateOrderSchemaArgs);
        });
    }
    static createRecord(schema, record) {
        return __awaiter(this, void 0, void 0, function* () {
            return quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateRecordData, [schema, record]);
        });
    }
    static findRecord(schema, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return quikdb.callCanisterMethod(sdk_1.CanisterMethod.GetRecord, [schema, id]);
        });
    }
    static searchByField(schema, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return quikdb.callCanisterMethod(sdk_1.CanisterMethod.SearchByIndex, [schema, field, value]);
        });
    }
    static listRecords(schema, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return quikdb.callCanisterMethod(sdk_1.CanisterMethod.GetAllRecords, [schema]);
            //     let allRecords= await quikdb.callCanisterMethod(CanisterMethod.GetAllRecords, [schema]);
            //    if  (!allRecords) return allRecords
            //     if 
            // if (!allRecords) return allRecords;
            // Manual pagination (QuikDB doesn't support native pagination)
            // const start = (page - 1) * limit;
            // const end = start + limit;
            // return { 
            //   ok: allRecords.slice(start, end) 
            // };
        });
    }
}
exports.DatabaseService = DatabaseService;
