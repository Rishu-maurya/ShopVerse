const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            })
        }

        const token = authHeader.slice(7)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key')

        req.userId = decoded.userId || decoded.id
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        })
    }
}

module.exports = authMiddleware
