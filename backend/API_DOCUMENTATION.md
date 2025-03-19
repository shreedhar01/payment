# Simple Payment Backend API Documentation

## Overview
This API powers a Simple Payment application allowing users to register, sign in, check balances, and transfer money between accounts. The API is built with Express.js, MongoDB, and uses JWT for authentication.

## Base URL
The API is deployed and accessible at:
```
https://payment-eta-ruddy.vercel.app
```

All endpoints should be prefixed with this base URL. For example:
```
https://payment-eta-ruddy.vercel.app/api/v1/user/signin
```

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Account Routes](#account-routes)
- [Error Handling](#error-handling)
- [Models](#models)

## Setup Instructions

1. **Clone Repository**
```bash
git clone <repository-url>
cd paytm/backend
```

2. **Environment Variables**  
Create a `.env` file with the following variables:
```
MONGODB_URI = "your_mongodb_connection_string"
JWT_SECRET = "your_jwt_secret"
```

3. **Install Dependencies**
```bash
npm install
```

4. **Run the Server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server runs on port 8000 by default.

## Authentication

The API uses JWT-based authentication. For protected routes, include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is provided after successful signup or signin.

## API Endpoints

### User Routes

#### Create a new user
- **URL**: `/api/v1/user/signup`
- **Method**: `POST`
- **Auth Required**: No
- **Body**:
```json
{
  "userName": "user@example.com",
  "fullName": "John Doe",
  "password": "password123"
}
```
- **Success Response**: 
```json
{
  "message": "user created successfully",
  "token": "<jwt_token>"
}
```

#### Sign in
- **URL**: `/api/v1/user/signin`
- **Method**: `POST`
- **Auth Required**: No
- **Body**:
```json
{
  "userName": "user@example.com",
  "password": "password123"
}
```
- **Success Response**: 
```json
{
  "message": "login successfully",
  "token": "<jwt_token>"
}
```

#### Update user details
- **URL**: `/api/v1/user/`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **Body**: At least one of the following fields is required
```json
{
  "userName": "new_email@example.com",
  "fullName": "New Name",
  "password": "newpassword123"
}
```
- **Success Response**: 
```json
{
  "message": "User updated successfully"
}
```

#### Search users
- **URL**: `/api/v1/user/bulk?filter=<search_term>`
- **Method**: `GET`
- **Auth Required**: Yes
- **Query Parameters**: `filter` - Search term for user's full name
- **Success Response**: 
```json
{
  "message": "everything work successfully",
  "data": [
    {
      "_id": "user_id",
      "fullName": "John Doe"
    }
  ]
}
```

### Account Routes

#### Get balance
- **URL**: `/api/v1/account/balance`
- **Method**: `GET`
- **Auth Required**: Yes
- **Success Response**: 
```json
{
  "message": "balance fetch successfully",
  "balance": 5000
}
```

#### Transfer money
- **URL**: `/api/v1/account/transfer`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **Body**:
```json
{
  "to": "recipient_user_id",
  "amount": 1000
}
```
- **Success Response**: 
```json
{
  "message": "balance transfer successfully"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in JSON format:

```json
{
  "success": false,
  "message": "Error message"
}
```

Common error status codes:
- `400`: Bad Request (validation errors, insufficient balance)
- `404`: Not Found (user or account not found)
- `500`: Internal Server Error

## Models

### User Model
```javascript
{
    fullName: String,
    userName: String, // Email
    password: String
}
```

### Account Model
```javascript
{
    userId: ObjectId, // Reference to User
    balance: Number
}
```
