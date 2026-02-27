const express = require("express");
const { register, login, getProfile } = require("./auth.controller");
const { authenticateToken } = require("../../middleware/auth.middleware");

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get user profile
router.get("/profile", authenticateToken, getProfile);

module.exports = router;