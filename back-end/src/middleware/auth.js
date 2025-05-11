const { getSession } = require('../auth/sessionId');

const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const authMiddleware = async (req, res, next) => {
    try {
        const sessionToken = req.cookies.session_token;

        if (!sessionToken) {
            return res.status(401).json({
                success: false,
                message: 'No session, authorization denied'
            });
        }

        const sessionUser = getSession(sessionToken);

        if (!sessionUser) {
            return res.status(401).json({
                success: false,
                message: 'Invalid session'
            });
        }

        req.user = sessionUser;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error verifying session',
            error: error.message
        });
    }
};

module.exports={
    authMiddleware,
    adminMiddleware
}