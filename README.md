# Bank App API

A simple API for a bank app, built with Node.js, Express.js and MongoDB.

## Details

The API has the following endpoints:

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Login a user.
- **GET /auth/protected**: Verify if the user is authenticated.
- **POST /accounts**: Create a new account.
- **GET /accounts/user/:userId**: Get all accounts for a specific user.
- **GET /accounts/:accountId**: Get a specific account.
- **POST /transactions**: Create a new transaction.
- **GET /transactions/:accountId/balance**: Get the balance of an account.

## Running the API

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `npm run dev` to start the server in development mode.
4. Open a web browser and navigate to `http://localhost:5000`.

## Running the routes

You can use a tool like Postman or cURL to test the endpoints. The API uses JSON Web Tokens for authentication, so you will need to obtain a token by sending a request to the `/auth/login` endpoint. You can then use the token in the `Authorization` header for subsequent requests.
