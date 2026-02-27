# Middleware

This directory contains Express middleware functions for request processing.

## Files Overview

### auth.middleware.js
JWT authentication middleware:
- `authenticateToken()` - Verifies JWT tokens from Authorization header
- Extracts token from "Bearer TOKEN" format
- Sets `req.user` with decoded token payload
- Returns 401 if no token, 403 if invalid token

## How It Works

1. **Token Extraction:**
   - Looks for Authorization header
   - Splits "Bearer TOKEN" to get token string

2. **Token Verification:**
   - Uses `verifyJWTToken()` from utils
   - Validates token signature and expiration

3. **User Context:**
   - Sets `req.user` with token data (id, username, role)
   - Allows routes to access authenticated user info

## Usage

Applied to protected routes in auth.routes.js:
```javascript
router.get("/profile", authenticateToken, getProfile);
```

## Dependencies

- Uses `jwt.util.js` for token verification
- Works with any JWT tokens created by the auth module
