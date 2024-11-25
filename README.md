# Bank App Backend

This is the backend for a simple bank application. It provides RESTful API endpoints for user authentication, account management, and transaction processing. The backend is built using Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- Account creation and management
- Transaction processing (credit and debit)
- JWT-based authentication
- CORS enabled for frontend communication

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/bank-app-backend.git
   cd bank-app-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Routes

### Authentication

- **Register a User**:  
  `POST /auth/register`  
  Request Body: `{ "username": "string", "email": "string", "password": "string" }`

- **Login a User**:  
  `POST /auth/login`  
  Request Body: `{ "email": "string", "password": "string" }`  
  Response: Returns a JWT token in cookies.

- **Logout a User**:  
  `POST /auth/logout`

### Account

- **Create an Account**:  
  `POST /api/account`  
  Request Body: `{ "userId": "string", "accountName": "string", "currency": "EUR", "balance": number }`  
  Requires JWT authentication.

- **Get All Accounts**:  
  `GET /api/account`  
  Requires JWT authentication.

### Transactions

- **Create a Transaction**:  
  `POST /api/transactions`  
  Request Body: `{ "accountId": "string", "type": "credit|debit", "amount": number, "currency": "EUR" }`  
  Requires JWT authentication.

- **Get Transactions for an Account**:  
  `GET /api/transactions/:accountId`  
  Query Parameters: `?type=credit|debit` (optional)  
  Requires JWT authentication.

## Testing

To test the API, you can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/). Make sure your MongoDB instance is running and the server is started using `npm run dev`.

