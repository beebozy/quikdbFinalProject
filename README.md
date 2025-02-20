QuikDB Final Project
This project is a Node.js application utilizing QuikDB to manage user and order . It demonstrates how to use QuikDB's schema and record management features while also implementing authentication with JSON Web Tokens (JWT).


Features
User Authentication: Register and login with password hashing using bcryptjs.
Order Management: Create and list orders linked to users.
Schema Management: Dynamic schema creation for User and Order using QuikDB.
REST API: Express server exposing endpoints for user and order operations.
JWT Authentication: Secured routes using JWT tokens.
QuikDB Integration: Utilizes quikdb-cli-beta/v1/sdk for data storage and retrieval.
Tech Stack
Node.js: Server-side runtime
Express: Web framework
QuikDB: Decentralized database
TypeScript: Static typing
JWT: Authentication
bcryptjs: Password hashing
dotenv: Environment variable management
Project Structure
graphql
Copy
Edit
src/
├── index.ts          # Main entry point
├── schema/           # Schema definitions for QuikDB
│   └── index.ts
├── services/
│   └── db.ts         # QuikDB initialization and CRUD operations
├── models/
│   ├── User.ts       # User model and data logic
│   └── Order.ts      # Order model and data logic
└── middleware/
    └── auth.ts       # JWT authentication middleware
Installation
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/beebozy/quikdbFinalProject.git
cd quikdbFinalProject
Install Dependencies:

bash
Copy
Edit
npm install
Environment Variables: Create a .env file in the root directory with the following:

ini
Copy
Edit
JWT_SECRET=your_secret_key
Run the Application:

bash
Copy
Edit
npm run dev
API Endpoints
User Authentication
Register: POST /api/register
json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Login: POST /api/login
json
Copy
Edit
{
  "email": "john@example.com",
  "password": "password123"
}
Order Management
Create Order: POST /api/orders (Protected Route)
json
Copy
Edit
{
  "description": "New Order",
  "status": "Pending"
}
List Orders by User: GET /api/orders (Protected Route)
QuikDB Schemas
User Schema
typescript
Copy
Edit
export const UserSchemaName = 'UserSchema';
export const UserSchemaFields = [
  { name: 'name', fieldType: 'Text', unique: false },
  { name: 'email', fieldType: 'Text', unique: true },
  { name: 'password', fieldType: 'Text', unique: false }
];
export const UserSchemaIndexes = ['email'];
Order Schema
typescript
Copy
Edit
export const OrderSchemaName = 'OrderSchema';
export const OrderSchemaFields = [
  { name: 'description', fieldType: 'Text', unique: false },
  { name: 'status', fieldType: 'Text', unique: false },
  { name: 'userId', fieldType: 'Text', unique: false }
];
export const OrderSchemaIndexes = ['userId'];
Usage
Register a new user to obtain a JWT token.
Use the token in the Authorization header to access protected routes:
makefile
Copy
Edit

License
This project is licensed under the MIT License.

Author
Musa Habeeblai Ajani

GitHub: beebozy
Email: musahabeeblai@gmail.com
Feel free to contribute or open an issue if you encounter any bugs or have suggestions for improvements!
