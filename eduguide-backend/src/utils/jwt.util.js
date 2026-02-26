const jwt = require("jsonwebtoken");

// crete token
const createJWTToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

// verfy token
const verifyJWTToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};



module.exports = {
    createJWTToken,
    verifyJWTToken

}