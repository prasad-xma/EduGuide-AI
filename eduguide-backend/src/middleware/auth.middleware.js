const { verifyJWTToken } = require("../utils/jwt.util");

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        // Bearer TOKEN
        const token = authHeader && authHeader.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token required"
            });
        }

        const decoded = verifyJWTToken(token);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

    //console.log(error);
    
};

module.exports = {
    authenticateToken,

};
