import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: { 
        type: String 
    },
    phoneNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    country: { 
        type: String 
    },
    assignedAgent: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, ref: "User" 
    },
    tags: [{
         type: String 
        }],
    lastMessageAt: {
         type: Date 
        },
    isActive: { 
        type: Boolean, 
        default: true 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
