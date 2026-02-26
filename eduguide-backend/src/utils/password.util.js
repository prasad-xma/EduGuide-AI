const bcrypt = require("bcryptjs");

// hash the password with 10 salt
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// compare the password with hashed password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};