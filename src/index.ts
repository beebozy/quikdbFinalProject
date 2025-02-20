// src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { DatabaseService } from './services/db';
import { UserModel, IUser } from './models/User';
import { OrderModel, IOrder } from './models/Order';
import { authenticate } from './middleware/auth';
import { QuikDB, CanisterMethod, DBRecord, ResultBool, ResultRecords } from 'quikdb-cli-beta/v1/sdk';

dotenv.config();
const app = express();
app.use(express.json());

// Initialize database
 DatabaseService.initialize().catch(console.error);

// Error handler
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

// User Routes
app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.create({ name, email, password });
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);
      console.log(user)
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      console.log("USER", user);
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      console.log("TOKEN", token);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  });




  app.get('/api/users', async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await DatabaseService.listRecords('UserSchema', 1, 100);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  

  app.get('/api/debug/schema/:name', async (req: Request, res: Response) => {
    const { name } = req.params;
    try {

      const quikdb = new QuikDB()
      const schema = await quikdb.callCanisterMethod(CanisterMethod.GetSchema, [name]);
      res.json(schema);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch schema' });
    }
  });
  
// Order Routes (Protected)
app.post('/api/orders', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { description } = req.body;
    const userId = req.user!.id;

    const order = await OrderModel.create({
      description,
      status: 'Pending',
      userId
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get('/api/orders', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const userId = req.user!.id;

    const orders = await OrderModel.listByUser(userId, page, limit);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/api/user/:id', async (req: Request, res: Response): Promise<void> => {
  const {id} = req.params;
  console.log("USERID", id)
  // const {email} = req.params;
  // console.log("USERMAIL", email)
  try {
    // const id = req.user!.id;
    // console.log("USERID", userId)
    // const {email} = req.params;
    // console.log("USERMAIL", email)
    // const user = await UserModel.findById(userId);
    // console.log("USER", user)
    const user = await UserModel.findById(id);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  // await quikdb.init();
 // DatabaseService.initialize().catch(console.error);
  console.log(`Server running on port ${PORT}`);
});