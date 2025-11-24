import mongoose from "mongoose";

const agentProfileSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true, 
        unique: true 
    },
    shift: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Shift" 
    },
    activeStatus: { 
        type: Boolean, 
        default: false 
    },
    totalConversationsHandled: { 
        type: Number, 
        default: 0 
    },
    avgResponseTime: { 
        type: Number, 
        default: 0 
    }, // in seconds
  },
  { timestamps: true }
);

export default mongoose.model("AgentProfile", agentProfileSchema);
