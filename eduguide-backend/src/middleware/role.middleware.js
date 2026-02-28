const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }
        next();
    };

};

module.exports = {
    authorizedRoles,
};