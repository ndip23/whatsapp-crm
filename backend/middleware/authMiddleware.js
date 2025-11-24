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

        // Check if user is active
        if(!user.isActive) {
            return res.status(403).json({message: "Account is inactive"});
        }

        //Attach user object to request
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid or expired token"});
    }
};