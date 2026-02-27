# Utilities

This directory contains utility functions used across the application.

## Files Overview

### jwt.util.js
JWT token operations:
- `createJWTToken(payload)` - Creates signed JWT token
- `verifyJWTToken(token)` - Verifies and decodes JWT token

### password.util.js
Password security operations:
- `hashPassword(password)` - Hashes password with bcrypt (salt rounds: 10)
- `comparePassword(password, hash)` - Compares plain password against hash

## How It Works

### JWT Tokens
- Uses `jsonwebtoken` library
- Signs tokens with `JWT_SECRET` from environment
- Token expiration set by `JWT_EXPIRE` environment variable
- Payload typically contains: id, username, role

### Password Security
- Uses `bcryptjs` for secure password hashing
- 10 salt rounds provide good security/performance balance
- Hashes are one-way - cannot be reversed to original password
- Comparison function handles bcrypt verification automatically



## Usage in Auth Module

- **Registration:** `hashPassword()` before saving user
- **Login:** `comparePassword()` to verify credentials
- **Token Creation:** `createJWTToken()` after successful login
- **Protected Routes:** `verifyJWTToken()` in middleware
