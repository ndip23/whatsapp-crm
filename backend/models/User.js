import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

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
}, {timestamps: true}
);


export default mongoose.model('User', UserSchema)