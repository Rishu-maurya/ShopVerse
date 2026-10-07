const User = require("../Model/users");

const roleCheck = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.userId).select("role");

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }


            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. You do not have permission to perform this action."
                });
            }

            req.userRole = user.role;
            next();
        } catch (error) {
            console.error("Role Check Error:", error);
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }
}

module.exports = roleCheck;