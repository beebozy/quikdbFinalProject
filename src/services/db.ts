import { QuikDB, CanisterMethod, DBRecord, ResultBool, ResultRecords } from 'quikdb-cli-beta/v1/sdk';
import { 
  CreateUserSchemaArgs, 
  CreateOrderSchemaArgs 
} from '../schema';

const quikdb = new QuikDB();

export class DatabaseService {


  static async initialize() {
    await quikdb.init();
    
     await quikdb.callCanisterMethod(CanisterMethod.InitOwner, []);
    // Create schemas if they don't exist
   const userSchemaResult= await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, CreateUserSchemaArgs);
   
   console.log("user schema is ", {userSchemaResult});
   const orderSchemaResult= await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, CreateOrderSchemaArgs);

   console.log("order schma", {orderSchemaResult});
  }

  static async createRecord(schema: string, record: DBRecord): Promise<ResultBool> {
    await quikdb.init();
    return quikdb.callCanisterMethod(CanisterMethod.CreateRecordData, [schema, record]);
  }

  static async findRecord(schema: string, id: string): Promise<DBRecord> {
    await quikdb.init();
    return quikdb.callCanisterMethod(CanisterMethod.GetRecord, [schema, id]);
  }

  static async searchByField(schema: string, field: string, value: string): Promise<DBRecord[]> {
    await quikdb.init();
    return quikdb.callCanisterMethod(CanisterMethod.SearchByIndex, [schema, field, value]) as Promise<DBRecord[]>;
  }

  static async listRecords(schema: string, page: number, limit: number): Promise<{ 
    
    ok?: DBRecord[], 
    total?: number, 
    page?: number, 
    limit?: number, 
    err?: string 
}> {
    await quikdb.init();
    // Fetch all records for the schema
    const allRecords = await quikdb.callCanisterMethod(CanisterMethod.GetAllRecords, [schema]) as ResultRecords;

    // Check if it's an error response
    if ('err' in allRecords) {
        return { err: allRecords.err };  // Return the error message
    }

    // Check if it's a success response and contains 'ok'
    if ('ok' in allRecords) {
        // Manual pagination
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedRecords = allRecords.ok.slice(start, end);

        return {
            ok: paginatedRecords,
            total: allRecords.ok.length,
            page,
            limit
        };
    }

    // Default fallback
    return { err: 'Unexpected response structure' };
}
}
