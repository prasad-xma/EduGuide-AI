# Authentication Module

This module handles user authentication for the EduGuide platform.

## Files Overview

### user.model.js
Defines the User schema with fields for:
- Basic info: firstName, lastName, username, email, password
- Role: student or instructor
- Profile: profileImage, isActive, timestamps

### auth.service.js
Business logic for authentication operations:
- `registerUser()` - Creates new user with hashed password
- `loginUser()` - Validates credentials and returns JWT token
- `getUserProfile()` - Fetches user data without password

### auth.controller.js
HTTP request handlers:
- `register()` - POST /register endpoint
- `login()` - POST /login endpoint  
- `getProfile()` - GET /profile endpoint (protected)

### auth.routes.js
Express router configuration:
- Routes connect controller functions to HTTP endpoints
- Uses `authenticateToken` middleware for protected routes

## How It Works

1. **Registration Flow:**
   - Client sends user data to POST /api/auth/register
   - Controller validates and calls service
   - Service hashes password and creates user
   - Returns user data (no token)

2. **Login Flow:**
   - Client sends username/password to POST /api/auth/login
   - Service validates credentials against database
   - Generates JWT token with user info
   - Returns user data + token

3. **Protected Routes:**
   - Client includes Bearer token in Authorization header
   - `authenticateToken` middleware verifies JWT
   - Sets `req.user` with decoded token data
   - Controller can access user info via `req.user.id`

## Dependencies

- Uses `password.util.js` for password hashing/comparison
- Uses `jwt.util.js` for token creation/verification
- Uses `auth.middleware.js` for route protection
- Connects to MongoDB via User model

## Database

All user data stored in MongoDB `users` collection with automatic timestamps for createdAt/updatedAt.
