# User Authentication API Documentation

## 1. Project Overview
This project provides Signup and Login APIs using Node.js, Express.js, and a JSON file (`users.json`) to store user details.

Passwords are hashed using bcryptjs before being stored.

## 2. Base URL
`http://localhost:3001`

## 3. Signup API

**Endpoint:** `/signup`  
**Method:** POST  
**Content-Type:** `application/json`

### Request Body
```json
{
  "name": "Komal",
  "email": "komaltest@example.com",
  "password": "Komal123"
}
```

### Success Response
**Status Code:** 201 Created

```json
{
  "success": true,
  "message": "Signup successful!",
  "user": {
    "id": 1791652414938,
    "name": "Komal",
    "email": "komaltest@example.com"
  }
}
```

### Possible Error Responses
- **400 Bad Request:** Required fields are missing.
- **409 Conflict:** Email is already registered.
- **500 Internal Server Error:** An unexpected error occurred.

## 4. Login API

**Endpoint:** `/login`  
**Method:** POST  
**Content-Type:** `application/json`

### Request Body
```json
{
  "email": "komaltest@example.com",
  "password": "Komal123"
}
```

### Success Response
**Status Code:** 200 OK

```json
{
  "success": true,
  "message": "Login successful!",
  "user": {
    "id": 1791652414938,
    "name": "Komal",
    "email": "komaltest@example.com"
  }
}
```

### Possible Error Responses
- **400 Bad Request:** Email or password is missing.
- **401 Unauthorized:** Email or password is incorrect.
- **500 Internal Server Error:** An unexpected error occurred.

## 5. Password Security
Passwords are hashed using bcryptjs before being saved in `users.json`. During login, the entered password is compared with the stored hash.

## 6. Storage
User details are stored in the `users.json` file.
