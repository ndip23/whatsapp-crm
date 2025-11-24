import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/User.js";


export const registerUser = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        const isExistingUser = await User.findOne({email});
        if(isExistingUser) {
            return res.status(400).json({message: "Email already exists"})
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role
        });
        res.status(201).json({
            message: "User registered successfully",
            user: {id: user._id, name: user.name, email: user.email, role: user.role},
        });
    } catch(error) {
        res.status(500).json({message: "Registration failed", error: error.message});
    }
};

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: "Invalid login credentials"});
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {id: user._id, name: user.name, email: user.email, role: user.role},
        });
    } catch (error) {
        res.status(500).json({message: "Login failed", error: error.message});
    }
};