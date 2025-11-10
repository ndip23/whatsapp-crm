import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({message: "Unauthorized: No token provided"});
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if(!user) return res.status(404).json({message: "User not found"});

        //Attach user object to request
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid or expired token"});
    }
};

//Middleware for admin-only  route
export const adminOnly = (req, res, next) => {
    if(req.user.role !== "ADMIN") {
        return res.status(403).json({message: "Access denied: admins only"});
    }
    next();
}