import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    type: { 
        type: String, 
        required: true 
    }, // e.g. "chat_assigned", "new_message", "followup_due"
    message: { 
        type: String 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    },
    metadata: { 
        type: Object 
    }, // additional info, e.g. conversationId
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
