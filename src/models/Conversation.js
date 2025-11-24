import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, 
        ref: "Client", 
        required: true 
    },
    assignedAgent: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    isLocked: { 
      type: Boolean, 
      default: false 
    },
    lockedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      default: null 
    },
    lockExpiresAt: { 
      type: Date, 
      default: null 
    },
    status: {
      type: String,
      enum: ["new", "open", "closed", "unassigned"],
      default: "unassigned",
    },
    lastMessage: { 
        type: String 
    },
    lastMessageAt: { 
        type: Date 
    },
    followUpAt: { 
        type: Date, 
        default: null 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
