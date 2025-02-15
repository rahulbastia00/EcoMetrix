# User Signup Implementation Documentation

## Overview
The signup feature is implemented using a Node.js/Express backend with PostgreSQL as the database. The implementation follows the MVC (Model-View-Controller) pattern and includes user data validation, password hashing, and proper error handling.

## Architecture Breakdown

### 1. Database Configuration (`backend/src/config/db.js`)
- Uses `node-postgres` (`pg`) library to create a connection pool.
- Connects to PostgreSQL using an environment variable `DATABASE_URL`.
- Provides a reusable database connection pool throughout the application.

### 2. Database Model (`backend/src/models/userModel.js`)
- Creates a `users` table with the following schema:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password TEXT
);
```

- Provides two main functions:
  - `insertUser`: Adds a new user to the database.
  - `getUserByEmail`: Retrieves a user by email (used for checking duplicate emails).

### 3. Controller (`backend/src/controllers/authController.js`)
The `registerUser` controller handles the signup logic:
1. Validates required fields (name, email, password).
2. Checks for existing users with the same email.
3. Hashes the password using bcrypt.
4. Creates a new user record.
5. Returns appropriate responses:
   - `201`: Successful registration.
   - `400`: Missing fields or duplicate email.
   - `500`: Server errors.

### 4. Routes (`backend/src/routes/authRoutes.js`)
- Defines the endpoint `/signup` using the `POST` method.
- Maps the route to the `registerUser` controller.

## Flow of Signup Process
1. Client sends a `POST` request to `/signup` with user data.
2. Request is routed to `registerUser` controller.
3. Controller validates input data.
4. Checks for an existing user with the same email.
5. If validation passes:
   - Password is hashed.
   - User is inserted into the database.
   - Success response is sent.
6. If any step fails:
   - An appropriate error response is sent.

## Security Features
- Password hashing using `bcrypt` (10 rounds).
- Email uniqueness validation.
- Input validation for required fields.
- Error handling with appropriate status codes.
- SQL injection prevention using parameterized queries.

## Error Handling
The implementation includes comprehensive error handling for:
- Missing required fields.
- Duplicate email addresses.
- Database errors.
- Server errors.

## Usage Example
To register a new user, send a `POST` request to `/signup` with the following JSON body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

This implementation provides a secure and robust signup system that can be easily extended with additional features like email verification or additional user fields.

