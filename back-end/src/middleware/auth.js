const { getSession } = require('../auth/sessionId');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const adminMiddleware = async (req, res, next) => {
    try {
        // console.log(req.cookies.session_token)
        const session_token = req.cookies.session_token;
        if (!session_token) {
            return res.status(401).json({
                success: false,
                message: 'No session,'
            });
        }
         try {
            const decoded = jwt.verify(session_token, process.env.SECRET_key);
            req.user = decoded._doc;  // decoded contains id, email, role
            if(req.user.role=="admin")
            next();
            else
            {
                return res.json({ status: false,message: "not permitted" });
            }
        } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }


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

        try {
            const decoded = jwt.verify(sessionToken, process.env.SECRET_key);
            req.user = decoded._doc;  // decoded contains id, email, role
            console.log(req.user);
            next();
        } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error verifying session',
            error: error.message
        });
    }
};

const isAdmin=(req,res,next)=>{

    if(req.user.role!="admin")
        return res.status(405).json({messege:"unAuthorized user"});
    next();
}

module.exports = {
    authMiddleware,
    adminMiddleware,
    isAdmin
}