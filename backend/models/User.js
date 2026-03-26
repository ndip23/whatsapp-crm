import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcryptjs"; // Import bcryptjs

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (v) => isEmail(v),
            message: (props) => `${props.value} is not valid email`,
        },
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "AGENT", "SUPER_ADMIN"],
        default: "ADMIN",
    },
    isActive: {
        type: Boolean, 
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

// 1. Hash the password automatically before saving
UserSchema.pre("save", async function (next) {
    // If the password hasn't been modified (e.g., just updating the user's name), skip hashing
    if (!this.isModified("password")) {
        return next();
    }

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// 2. Add a method to easily compare passwords during Login
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);