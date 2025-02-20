import { DBRecord, ResultBool } from 'quikdb-cli-beta/v1/sdk';
import { DatabaseService } from '../services/db';
import { UserSchemaName } from '../schema';
import bcrypt from 'bcryptjs';
import { log } from 'console';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class UserModel {
  static async create(user: Omit<IUser, 'id'>): Promise<IUser> {
    const id = Date.now().toString();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    

    // const hashedPassword = await bcrypt.hash(password, 10);
//const user = await UserModel.create({ name, email, password: hashedPassword });

    const record: DBRecord = {
      id,
      fields: [
        ['name', user.name],
        ['email', user.email],
        ['password', hashedPassword]
      ]
    };

    const result:ResultBool  = await DatabaseService.createRecord(UserSchemaName, record);
    if (!result) throw new Error(result);
    
    return { id, ...user, password: hashedPassword };
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    const result = await DatabaseService.searchByField(UserSchemaName, 'email', email);
    // console.log(result)

    console.log("Search result for email:", email, result);
    if (!result || result.length === 0) return null;
    
    const record = result[0];
    return {
      id: record.id,
      name: record.fields.find(f => f[0] === 'name')?.[1] || '',
      email: record.fields.find(f => f[0] === 'email')?.[1] || '',
      password: record.fields.find(f => f[0] === 'password')?.[1] || ''
    };
  }

  static async findById(id: string): Promise<IUser | null> {
    const result = await DatabaseService.findRecord(UserSchemaName, id);
    console.log(result)
    
    // if (!result || result.length === 0) return null;
    if (!result) return null;
    
    const record = result;
    return {
      id: record.id,
      name: record.fields.find(f => f[0] === 'name')?.[1] || '',
      email: record.fields.find(f => f[0] === 'email')?.[1] || '',
      password: record.fields.find(f => f[0] === 'password')?.[1] || ''
    };
//    return(result);
  }
}