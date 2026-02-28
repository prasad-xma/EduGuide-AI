const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Unauthorized - Insufficient permissions"
            });
        }
        next();
    };

};

module.exports = {
    authorizedRoles,
};