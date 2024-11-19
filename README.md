# Bank Backend

The Bank Backend is a RESTful API built using Node.js and Express.js, designed to manage user accounts, transactions, and authentication for a banking application. The application utilizes MongoDB as its database and Mongoose as the ODM (Object Data Modeling) library.

## Features

- User registration and authentication
- Secure password hashing with bcryptjs
- JSON Web Token (JWT) for authentication
- Account management with multiple currencies (USD, EUR, BRL)
- Transaction management (credit and debit operations)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dieegoolimaa/bank_backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bank_backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables by creating a `.env` file in the root directory, and specify the following variables:

   ```
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

   For development mode with live-reloading, use:

   ```bash
   npm run dev
   ```

## Routes

### Authentication Routes

- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Log in a user

### Account Routes

- **POST** `/api/account` - Create a new account (requires authentication)
- **GET** `/api/account/:accountId` - Get a specific account (requires authentication)
- **GET** `/api/account/user/:userId` - Get all accounts for a specific user (requires authentication)

### Transaction Routes

- **POST** `/api/transactions` - Create a new transaction (requires authentication)
- **GET** `/api/transactions/:accountId/balance` - Get the balance of an account (requires authentication)

## Middleware

- `isAuthenticated` - Middleware to protect routes by verifying JWT tokens.

## Error Handling

- Custom error handling middleware to return JSON responses for unhandled routes and errors.

## License

This project is licensed under the ISC License.
