import { DBRecord } from 'quikdb-cli-beta/v1/sdk';
import { DatabaseService } from '../services/db';
import { OrderSchemaName } from '../schema';

export interface IOrder {
  id: string;
  description: string;
  status: 'Pending' | 'In Transit' | 'Delivered';
  userId: string;
}

export class OrderModel {
    static async create(order: Omit<IOrder, 'id'>): Promise<IOrder> {
        const id = Date.now().toString();
        
        const record: DBRecord = {
          id,
          fields: [
            ['description', order.description],
            ['status', order.status],
            ['userId', order.userId]
          ]
        };
      
        const result = await DatabaseService.createRecord(OrderSchemaName, record);
        
        // Type guard: if the result contains 'err', it is an error.
        if ('err' in result) {
          throw new Error(result.err);
        }
        
        // If the result doesn't have 'err', it should have 'ok'
        if (!result.ok) {
          throw new Error("Record creation failed");
        }
        
        return { id, ...order };
      }
      

      static async listByUser(userId: string, page: number, limit: number): Promise<IOrder[]> {
        const records: DBRecord[] = await DatabaseService.searchByField(OrderSchemaName, 'userId', userId);
        
        // Manual pagination
        const start = (page - 1) * limit;
        const end = start + limit;
        return records.slice(start, end).map(record => ({
          id: record.id,
          description: record.fields.find(f => f[0] === 'description')?.[1] || '',
          status: record.fields.find(f => f[0] === 'status')?.[1] as IOrder['status'],
          userId: record.fields.find(f => f[0] === 'userId')?.[1] || ''
        }));
      }
      
}